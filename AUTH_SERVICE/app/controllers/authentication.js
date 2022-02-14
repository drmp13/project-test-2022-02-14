'use strict';
require('module-alias/register');
const Joi = require('joi');
const UserModel = require("@models/userModel");
const Config = require('@config/config');
var JWT   = require('jsonwebtoken');
const userModel = new UserModel();
const responseHelper = require('@helpers/response');
const moment = require("moment");


exports.login = async (request, h) => {
  const payload = Object.assign({},request.payload);

  const login = await userModel.auth(payload.username,payload.password);

  if(!login.is_query_failed){

    if(login.data.length>0){
      let secret = Config.get('/jwtAuthOptions/key');
      let obj = {
          username : payload.username,
          api_key__elevania: login.data[0].api_key__elevania
      };
      let jwtToken = JWT.sign(obj, secret, {});

      return responseHelper.sendResponseHTTP(h, 200, "auth success", {'access-token': jwtToken});
    }else{
      return responseHelper.sendResponseHTTP(h, 401, "auth data not found");
    }

  }else{
    return responseHelper.sendResponseHTTP(h, 400);
  }
};

exports.test = async (request, h) => {
  if (!request.auth.isAuthenticated) {
    return responseHelper.sendResponseHTTP(h, 401, "failed");
  }else{
    return responseHelper.sendResponseHTTP(h, 200, "authenticated",{headers:request.headers});
  }
};
