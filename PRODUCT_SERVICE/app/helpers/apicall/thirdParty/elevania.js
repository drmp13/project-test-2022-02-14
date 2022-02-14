'use strict';
const fetch = require('@helpers/apicall/fetch');

exports.fetchFromEndpoint = async function (api_key, endpoint, params={}, data={}, tail="") {
  var method="";
  var url="";

  switch(endpoint) {
    case 'getCategories':
      method="get";
      url= process.env.API_THIRD_PARTY__ELEVANIA__BASEPOINT+"/rest/cateservice/category";
      break;
    case 'getProducts':
      method="get";
      url= process.env.API_THIRD_PARTY__ELEVANIA__BASEPOINT+"/rest/prodservices/product/listing";
      break;
    case 'getProductDetail':
      method="get";
      url= process.env.API_THIRD_PARTY__ELEVANIA__BASEPOINT+"/rest/prodservices/product/details";
      break;
    default:
      return {
        status: "failed"
      }
    }

    const request = {
      headers: {
        openapikey: api_key
      },
      method: method,
      url: url+tail,
      params: params,
      data: data
    }

    const response = await fetch.getResponse(request);
    if(response.headers['content-type']=='application/xml'){
      const xml2js = require('xml2js');
      xml2js.parseString(response.data, (err, result) => {
        if(err) {
            throw err;
        }
        response.data = result
      });
    }
    return {
      status: response.fetch_status,
      data: response.data
    }
};
