require('module-alias/register');
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
const config = require('@config');
const db_postgres_users=config.sql.postgres.users;


const connection = new Sequelize('postgres://'+db_postgres_users.user+':'+db_postgres_users.password+'@'+db_postgres_users.host+':'+db_postgres_users.port+'/'+db_postgres_users.db, {logging: false})

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
