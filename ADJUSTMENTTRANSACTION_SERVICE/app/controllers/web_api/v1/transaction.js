'use strict';
require('module-alias/register');
const Joi = require('joi');
const TransactionModel = require("@models/transactionModel");
const transactionModel = new TransactionModel();
const ProductModel = require("@models/productModel");
const productModel = new ProductModel();
const responseHelper = require('@helpers/response');
const api_elevania = require('@helpers/apicall/thirdParty/elevania');
const moment = require("moment");


exports.list = async (request, h) => {
  const query = Object.assign({},request.query);
  const limit=5;
  const offset=(query.page*limit)-limit;

  const username=request.headers.userdata.username;
  const products = await transactionModel.getTransactions(username,limit,offset);

  if(!products.is_query_failed){
    return responseHelper.sendResponseHTTP(h, 200, "success", products.data);
  }else{
    return responseHelper.sendResponseHTTP(h, 400);
  }
};

exports.create = async (request, h) => {
  const payload = Object.assign({},request.payload);
  const username=request.headers.userdata.username;

  payload.current_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const check_product = await productModel.getProductsBySKU(username,payload.sku);
  if(check_product.data.length>0){
    if(parseInt(check_product.data[0].stock)>=parseInt(payload.qty)){
      payload.amount=payload.qty*check_product.data[0].price;
      const insert = await transactionModel.createTransaction(username,payload);
      const adjust = await productModel.adjustProductStock(username,payload.sku,payload.qty);
      if(!insert.is_query_failed){
        return responseHelper.sendResponseHTTP(h, 201, "transaction created");
      }else{
        return responseHelper.sendResponseHTTP(h, 400);
      }
    }else{
      return responseHelper.sendResponseHTTP(h, 409, "insufficient product stock");
    }
  }else{
    return responseHelper.sendResponseHTTP(h, 404, "product sku not found");
  }
};

exports.update = async (request, h) => {
  const payload = Object.assign({},request.payload);
  const params = Object.assign({},request.params);
  const username=request.headers.userdata.username;

  payload.current_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const check_transaction = await transactionModel.getTransactionDetailByID(username,params.transactionID);
  if(check_transaction.data.length>0){

    const check_product = await productModel.getProductsBySKU(username,check_transaction.data[0].sku);

    if(check_product.data.length>0){
      if((parseInt(check_product.data[0].stock)+parseInt(check_transaction.data[0].qty))>=parseInt(payload.qty)){
        payload.id=params.transactionID;
        payload.sku=check_product.data[0].sku;
        payload.amount=payload.qty*(check_transaction.data[0].amount/check_transaction.data[0].qty);
        const update = await transactionModel.updateTransaction(username,payload);
        await productModel.adjustProductStock(username,check_transaction.data[0].sku,(check_transaction.data[0].qty*-1));
        await productModel.adjustProductStock(username,check_transaction.data[0].sku,payload.qty);
        if(!update.is_query_failed){
          return responseHelper.sendResponseHTTP(h, 200, "transaction updated");
        }else{
          return responseHelper.sendResponseHTTP(h, 400);
        }
      }else{
        return responseHelper.sendResponseHTTP(h, 409, "insufficient product stock");
      }
    }else{
      return responseHelper.sendResponseHTTP(h, 409, "duplicate sku");
    }
  }else{
    return responseHelper.sendResponseHTTP(h, 404, "transaction not found");
  }
};

exports.delete = async (request, h) => {
  const params = Object.assign({},request.params);
  const username=request.headers.userdata.username;

  const check_transaction = await transactionModel.getTransactionDetailByID(username,params.transactionID);
  if(check_transaction.data.length>0){
    const delete_data = await transactionModel.deleteTransaction(username,params.transactionID);
    await productModel.adjustProductStock(username,check_transaction.data[0].sku,(check_transaction.data[0].qty*-1));
    if(!delete_data.is_query_failed){
      return responseHelper.sendResponseHTTP(h, 200, "transaction deleted");
    }else{
      return responseHelper.sendResponseHTTP(h, 400);
    }
  }else{
    return responseHelper.sendResponseHTTP(h, 404, "transaction not found");
  }
};

exports.detail = async (request, h) => {
  const params = Object.assign({},request.params);
  const username=request.headers.userdata.username;

  const products = await transactionModel.getTransactionDetailByID(username,params.transactionID);

  if(!products.is_query_failed){
    if(products.data.length>0){
      return responseHelper.sendResponseHTTP(h, 200, "success", products.data[0]);
    }else{
      return responseHelper.sendResponseHTTP(h, 404, "transaction not found", null);
    }
  }else{
    return responseHelper.sendResponseHTTP(h, 400);
  }
};
