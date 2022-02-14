'use strict';
const fetch = require('@helpers/apicall/fetch');

exports.fetchFromEndpoint = async function (endpoint, params={}, data={}, tail="") {
  var method="";
  var url="";

  switch(endpoint) {
    case 'getProductDetail':
      method="get";
      url= process.env.SERVICE_PRODUCT__API__LOCAL_HOST+"/v1/products";
      break;
    default:
      return {
        status: "failed"
      }
    }

    const request = {
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
