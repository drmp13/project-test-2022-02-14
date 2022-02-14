require('dotenv').config();

const sql = {
    postgres: {
      product: {
        host: process.env.SERVICE_PRODUCT__DATABASE_PG__HOST,
        user: process.env.SERVICE_PRODUCT__DATABASE_PG__USER,
        password: process.env.SERVICE_PRODUCT__DATABASE_PG__PASS,
        port: 5432,
        db: process.env.SERVICE_PRODUCT__DATABASE_PG__DB,
      },
      transaction: {
        host: process.env.SERVICE_ADJUSTMENTTRANSACTION__DATABASE_PG__HOST,
        user: process.env.SERVICE_ADJUSTMENTTRANSACTION__DATABASE_PG__USER,
        password: process.env.SERVICE_ADJUSTMENTTRANSACTION__DATABASE_PG__PASS,
        port: 5432,
        db: process.env.SERVICE_ADJUSTMENTTRANSACTION__DATABASE_PG__DB,
      }
    }

};

module.exports = sql;
