const postgres = require('@connection/database/postgres.js');
const postgres_transaction = require('@connection/database/postgres_transaction.js');

const connection = {
  postgres,
  postgres_transaction
};

module.exports = connection;
