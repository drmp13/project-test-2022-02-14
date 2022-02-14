const connection = require('@connection');
const sequelize = require("@connection/database/postgres_product").connection;
const sequelize_node = require('sequelize');
const { QueryTypes } = require('sequelize');


class ProductModel{
  constructor(){

  }

  async index(){

  }

  async seedTestData(){
    var response = {}
    await sequelize.query(
       `INSERT INTO products
        (username,
         sku,
         name,
         price,
         stock,
         description
       ) VALUES (
         'tester',
         'SKU-1',
         'Phone',
         100000,
         100,
         ''
       ) `,
        {
          type: sequelize_node.QueryTypes.INSERT,
          raw: true
        }
    );
    return response;
  }

  async getProductsBySKU(username,sku){
    var response = {}
    await sequelize.query(
       `SELECT id,name,sku,image,price,stock from products
        WHERE username=$username
              AND sku=$sku`,
        {
          bind: {
            username:username,
            sku: sku
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

  async adjustProductStock(username,sku,qty){
    var response = {}
    await sequelize.query(
       `UPDATE products
        SET stock=stock-$qty
        WHERE username=$username
              AND sku=$sku`,
        {
          bind: {
            username:username,
            sku: sku,
            qty: qty
          },
          type: QueryTypes.UPDATE,
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

module.exports = ProductModel;
