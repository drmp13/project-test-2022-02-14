require('module-alias/register');
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
const config = require('@config');
const db_postgres_product=config.sql.postgres.product;


const connection = new Sequelize('postgres://'+db_postgres_product.user+':'+db_postgres_product.password+'@'+db_postgres_product.host+':'+db_postgres_product.port+'/'+db_postgres_product.db, {logging: false, dialect: 'postgres'})

try {
  connection.authenticate().then(() => {
    console.log('Connection to postgres has been established successfully.');
   })
   .catch(err => {
    console.log('ERROR - Unable to connect to the postgres database:', err)
  });
} catch (error) {
  console.log('Unable to connect to the database:', error);
}

module.exports = {
  connection
};
