'use strict';
require('module-alias/register');
const Joi = require('joi');
const ProductModel = require("@models/productModel");
const productModel = new ProductModel();
const Transaction = require("@models/transactionModel");
const transactionModel = new Transaction();
const responseHelper = require('@helpers/response');
const moment = require("moment");

exports.list = async (request, h) => {
  const query = Object.assign({},request.query);
  const limit=5;
  const offset=(query.page*limit)-limit;

  const username=request.headers.userdata.username;
  const products = await productModel.getProducts(username,limit,offset);

  if(!products.is_query_failed){
    return responseHelper.sendResponseHTTP(h, 200, "success", products.data);
  }else{
    return responseHelper.sendResponseHTTP(h, 400);
  }
};

exports.create = async (request, h) => {
  const payload = Object.assign({},request.payload);
  const username=request.headers.userdata.username;

  payload.image = JSON.stringify(payload.image);
  payload.current_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");


  const check_sku = await productModel.checkProductBySKU(username,payload.sku);
  if(check_sku.data.length==0){
    const insert = await productModel.createProduct(username,payload);
    if(!insert.is_query_failed){
      return responseHelper.sendResponseHTTP(h, 201, "product created");
    }else{
      return responseHelper.sendResponseHTTP(h, 400);
    }
  }else{
    return responseHelper.sendResponseHTTP(h, 409, "duplicate sku");
  }
};

exports.update = async (request, h) => {
  const payload = Object.assign({},request.payload);
  const params = Object.assign({},request.params);
  const username=request.headers.userdata.username;
  payload.image = JSON.stringify(payload.image);
  payload.current_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  const check_product = await productModel.getProductDetailByID(username,params.productID);
  if(check_product.data.length>0){
    const check_sku = await productModel.checkProductBySKU(username,payload.sku, params.productID);

    if(check_sku.data.length==0){
      payload.id=params.productID;
      const update = await productModel.updateProduct(username,payload);
      if(!update.is_query_failed){
        await transactionModel.updateSKUFromTransactions(username,check_product.data[0].sku,payload.sku);
        return responseHelper.sendResponseHTTP(h, 200, "product updated");
      }else{
        return responseHelper.sendResponseHTTP(h, 400);
      }
    }else{
      return responseHelper.sendResponseHTTP(h, 409, "duplicate sku");
    }
  }else{
    return responseHelper.sendResponseHTTP(h, 404, "product not found");
  }
};

exports.delete = async (request, h) => {
  const params = Object.assign({},request.params);
  const username=request.headers.userdata.username;

  const check_product = await productModel.getProductDetailByID(username,params.productID);
  if(check_product.data.length>0){
    const delete_data = await productModel.deleteProduct(username,params.productID);
    if(!delete_data.is_query_failed){
      await transactionModel.deleteSKUFromTransactions(username,check_product.data[0].sku);
      return responseHelper.sendResponseHTTP(h, 200, "product deleted");
    }else{
      return responseHelper.sendResponseHTTP(h, 400);
    }
  }else{
    return responseHelper.sendResponseHTTP(h, 404, "product not found");
  }
};

exports.detail = async (request, h) => {
  const params = Object.assign({},request.params);
  const username=request.headers.userdata.username;

  const products = await productModel.getProductDetailByID(username,params.productID);

  if(!products.is_query_failed){
    if(products.data.length>0){
      return responseHelper.sendResponseHTTP(h, 200, "success", products.data[0]);
    }else{
      return responseHelper.sendResponseHTTP(h, 404, "product not found", null);
    }
  }else{
    return responseHelper.sendResponseHTTP(h, 400);
  }
};
