const connection = require('@connection');
const sequelize = require("@connection/database/postgres").connection;
const sequelize_node = require('sequelize');
const { QueryTypes } = require('sequelize');


class ProductModel{
  constructor(){

  }

  async index(){

  }

  async getProducts(username,limit,offset){
    var response = {}
    await sequelize.query(
       `SELECT id,name,sku,image,price,stock from products
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

  async getProductDetailByID(username,id){
    var response = {}
    await sequelize.query(
       `SELECT id,name,sku,image,price,stock,description from products
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

  async createProduct(username,payload){
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
         created_at
       ) VALUES (
         $username,
         $sku,
         $name,
         $image,
         $price,
         $stock,
         $description,
         $current_time
       ) `,
        {
          bind: {
            username: username,
            sku: payload.sku,
            name: payload.name,
            image: payload.image,
            price: payload.price,
            stock: payload.stock,
            description: payload.description,
            current_time: payload.current_time
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

  async updateProduct(username,payload){
    var response = {}
    await sequelize.query(
       `UPDATE products
        SET sku= $sku,
            name= $name,
            image= $image,
            price= $price,
            stock= $stock,
            description= $description,
            updated_at= $current_time
        WHERE id= $id
              AND username=$username`,
        {
          bind: {
            username: username,
            id: payload.id,
            sku: payload.sku,
            name: payload.name,
            image: payload.image,
            price: payload.price,
            stock: payload.stock,
            description: payload.description,
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

  async deleteProduct(username,productID){
    var response = {}
    await sequelize.query(
       `DELETE FROM products
        WHERE id= $id
              AND username=$username`,
        {
          bind: {
            username: username,
            id: productID
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

  async bulkInsertFetchProducts(data_products){
    var response = {}
    var product_inserted_inserted=0;
    var product_inserted_duplicate=0;
    var product_inserted_failed=0;

    try {

      for (const data_product of data_products) {
        const t = await sequelize.transaction({ type: sequelize_node.Transaction.TYPES.READ_COMMITTED });
        try{
          const check = await this.checkProductBySKU(data_product.username,data_product.sku);
          if(check.data.length==0 && data_product.sku!=null && data_product.sku!=''){
            const insert = await this.insertProduct(data_product, t);
            if(insert.is_query_failed==false){
              product_inserted_inserted++;
              t.commit();
            }else{
              product_inserted_failed++;
              t.rollback();
            }
          }else{
            product_inserted_duplicate++;
            t.commit();
          }
        }catch(err){
          product_inserted_failed++;
          t.rollback();
        }
      }


      response = {
        is_query_failed: false,
        summary: {
          totalData: product_inserted_inserted+product_inserted_duplicate+product_inserted_failed,
          totalInserted: product_inserted_inserted,
          totalNotInsertedBecauseDuplicateSKU: product_inserted_duplicate,
          totalNotInsertedBecauseUnknownError: product_inserted_failed
        }
      };

    } catch(err) {
      response = {
        is_query_failed: true,
        message: err
      };
    }
    return response;
  }



}

module.exports = ProductModel;
