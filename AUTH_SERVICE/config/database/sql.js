require('dotenv').config();

const sql = {
    postgres: {
      users: {
        host: process.env.SERVICE_USER__DATABASE_PG__HOST,
        user: process.env.SERVICE_USER__DATABASE_PG__USER,
        password: process.env.SERVICE_USER__DATABASE_PG__PASS,
        port: 5432,
        db: process.env.SERVICE_USER__DATABASE_PG__DB,
      }
    }

};

module.exports = sql;
