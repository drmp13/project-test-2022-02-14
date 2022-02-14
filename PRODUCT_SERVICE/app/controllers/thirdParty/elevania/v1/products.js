'use strict';
require('module-alias/register');
const Joi = require('joi');
const ProductModel = require("@models/productModel");
const productModel = new ProductModel();
const responseHelper = require('@helpers/response');
const api_elevania = require('@helpers/apicall/thirdParty/elevania');
const moment = require("moment");

exports.init = async (request, h) => {
  var products_final=[];
  var initial_page=1;
  var fetch_stop=false;
  var summary;

  const api_key__elevania=request.headers.userdata.api_key__elevania;
  const username=request.headers.userdata.username;

  while(!fetch_stop){
    const fetchProductsFromElev = await api_elevania.fetchFromEndpoint(api_key__elevania,'getProducts',{page: initial_page});

    initial_page++;
    if(fetchProductsFromElev.status=="success"){
       const products = fetchProductsFromElev.data.Products;
       if(products!=""){
         for (const product of products.product) {
           const fetchProductDetailFromElev = await api_elevania.fetchFromEndpoint(api_key__elevania,'getProductDetail',{},{},'/'+product.prdNo[0]);
           if(fetchProductDetailFromElev.status=="success"){
             const product_detail = fetchProductDetailFromElev.data.Product;
             var images=[];
             var desc=null;
             var stock=0;


             if(product_detail!=""){
               if(product_detail.hasOwnProperty('prdImage01')){
                 images.push({prdImage01: product_detail.prdImage01[0]});
               }

               if(product_detail.hasOwnProperty('htmlDetail')){
                 desc=product_detail.htmlDetail[0];
               }

               if(product_detail.hasOwnProperty('prdSelQty')){
                 stock=product_detail.prdSelQty[0];
               }

               const product_data={
                 username: username,
                 sku: product.sellerPrdCd[0],
                 name: product.prdNm[0],
                 image: JSON.stringify(images),
                 price: product.selPrc[0],
                 stock: stock,
                 description: desc,
                 created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                 updated_at: null
               }
               products_final.push(product_data);
             }
           }
         }
       }else{
         fetch_stop=true;
       }
    }else{
      fetch_stop=true;
      return responseHelper.sendResponseHTTP(h, 400, "failed", "Failed to fetch all products from Elevania");
    }

  }
  const bulkInsert = await productModel.bulkInsertFetchProducts(products_final);
  if(!bulkInsert.is_query_failed){
    summary=bulkInsert.summary;
  }

  return responseHelper.sendResponseHTTP(h, 200, "success", {
    summary: summary,
    dataFromAPI: products_final
  });

};
