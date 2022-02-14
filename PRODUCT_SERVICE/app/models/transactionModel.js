const connection = require('@connection');
const sequelize = require("@connection/database/postgres_transaction").connection;
const sequelize_node = require('sequelize');
const { QueryTypes } = require('sequelize');


class TransactionModel{
  constructor(){

  }

  async index(){

  }

  async updateSKUFromTransactions(username,old_data,new_data){
    var response = {}
    await sequelize.query(
       `UPDATE transaction
        SET sku= $new_data
        WHERE sku= $old_data
              AND username=$username`,
        {
          bind: {
            username: username,
            new_data: new_data,
            old_data: old_data
          },
          type: sequelize_node.QueryTypes.UPDATE,
          raw: true
        }
    ).then((result) => {
      response = {
        is_query_failed: false
      };
    }).catch(err => {
      response = {
        is_query_failed: true,
        message: err
      };
    });
    console.log(response)
    return response;
  }

  async deleteSKUFromTransactions(username,sku){
    var response = {}
    await sequelize.query(
       `DELETE FROM transaction
        WHERE sku= $sku
              AND username=$username`,
        {
          bind: {
            username: username,
            sku: sku
          },
          type: sequelize_node.QueryTypes.DELETE,
          raw: true
        }
    ).then((result) => {
      response = {
        is_query_failed: false
      };
    }).catch(err => {
      response = {
        is_query_failed: true,
        message: err
      };
    });
    console.log(response)
    return response;
  }

  async insertProduct(payload, transaction){
    var response = {}
    await sequelize.query(
       `INSERT INTO products
        (username,
         sku,
         name,
         image,
         price,
         stock,
         description,
         created_at,
         updated_at
       ) VALUES (
         $username,
         $sku,
         $name,
         $image,
         $price,
         $stock,
         $description,
         $created_at,
         $updated_at
       ) `,
        {
          bind: {
            username: payload.username,
            sku: payload.sku,
            name: payload.name,
            image: payload.image,
            price: payload.price,
            stock: payload.stock,
            description: payload.description,
            created_at: payload.created_at,
            updated_at: payload.updated_at
          },
          transaction: transaction,
          type: sequelize_node.QueryTypes.INSERT,
          raw: true
        }
    ).then((result) => {
      response = {
        is_query_failed: false,
        data: result[0][0]
      };
    }).catch(err => {
      response = {
        is_query_failed: true,
        message: err
      };
    });

    return response;
  }

  async checkProductBySKU(username,sku,productID=null){
    var response = {}
    var where_clause="";
    var bind_clause={
      sku: sku,
      username: username
    };

    if(productID!=null){
      where_clause=" AND id!=$id";
      bind_clause.id = productID;
    }

    await sequelize.query(
       `SELECT * FROM products
        WHERE username=$username
              AND sku= $sku`+where_clause,
        {
          bind: bind_clause,
          type: sequelize_node.QueryTypes.SELECT,
          raw: true
        }
    ).then((result) => {
      response = {
        is_query_failed: false,
        data: result
      };
    }).catch(err => {
      response = {
        is_query_failed: true,
        message: err
      };
    });

    return response;
  }






}

module.exports = TransactionModel;
