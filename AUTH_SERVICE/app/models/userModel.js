const connection = require('@connection');
const sequelize = require("@connection/database/postgres").connection;
const sequelize_node = require('sequelize');
const { QueryTypes } = require('sequelize');


class UserModel{
  constructor(){

  }

  async index(){

  }

  async auth(username,password){
    var response = {}
    await sequelize.query(
       `SELECT api_key__elevania
        FROM users
        WHERE username=$username
              AND password=$password`,
        {
          bind: {
            username: username,
            password: password
          },
          type: QueryTypes.SELECT,
          raw: true
        }
    ).then((value) => {
      response = {
        is_query_failed: false,
        data: value
      };
    }).catch(err => {
      response = {
        is_query_failed: true
      };
    });
    return response;
  }

}

module.exports = UserModel;
