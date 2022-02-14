const connection = require('@connection');
const sequelize = require("@connection/database/postgres").connection;
const sequelize_node = require('sequelize');
const { QueryTypes } = require('sequelize');


class TransactionModel{
  constructor(){

  }

  async index(){

  }

  async getTransactions(username,limit,offset){
    var response = {}
    await sequelize.query(
       `SELECT id,sku,qty,amount from transaction
        WHERE username=$username
        LIMIT $limit OFFSET $offset`,
        {
          bind: {
            username:username,
            limit: limit,
            offset: offset
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

  async getTransactionDetailByID(username,id){
    var response = {}
    await sequelize.query(
       `SELECT id,sku,qty,amount from transaction
        WHERE username=$username AND id=$id`,
        {
          bind: {
            username: username,
            id: id
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

  async createTransaction(username,payload){
    var response = {}
    await sequelize.query(
       `INSERT INTO transaction
        (username,
         sku,
         qty,
         amount,
         created_at
       ) VALUES (
         $username,
         $sku,
         $qty,
         $amount,
         $created_at
       ) `,
        {
          bind: {
            username: username,
            sku: payload.sku,
            qty: payload.qty,
            amount: payload.amount,
            created_at: payload.current_time
          },
          type: sequelize_node.QueryTypes.INSERT,
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

  async updateTransaction(username,payload){
    var response = {}
    await sequelize.query(
       `UPDATE transaction
        SET sku= $sku,
            qty= $qty,
            amount= $amount,
            updated_at= $current_time
        WHERE id= $id
              AND username=$username`,
        {
          bind: {
            username: username,
            id: payload.id,
            sku: payload.sku,
            qty: payload.qty,
            amount: payload.amount,
            current_time: payload.current_time
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

  async deleteTransaction(username,transactionID){
    var response = {}
    await sequelize.query(
       `DELETE FROM transaction
        WHERE id= $id
              AND username=$username`,
        {
          bind: {
            username: username,
            id: transactionID
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
