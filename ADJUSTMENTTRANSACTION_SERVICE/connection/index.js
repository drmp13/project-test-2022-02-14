const postgres = require('@connection/database/postgres.js');
const postgres_product = require('@connection/database/postgres_product.js');

const connection = {
  postgres,
  postgres_product
};

module.exports = connection;
