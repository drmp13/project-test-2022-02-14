
const dotenv = require('dotenv');
dotenv.config();
const server = require('../../server');
const Wreck = require('wreck');
const rp = require('request-promise');
// const request = supertest(server)

const connection = require('@connection');
const sequelize = require("@connection/database/postgres").connection;
const sequelize_product = require("@connection/database/postgres_product").connection;
const sequelize_node = require('sequelize');
const { QueryTypes } = require('sequelize');

module.exports = {
   // request : request,
    context: { api:'/v1', token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlciIsImFwaV9rZXlfX2VsZXZhbmlhIjoiNzIxNDA3ZjM5M2U4NGEyODU5MzM3NGNjMmIzNDdhOTgiLCJpYXQiOjE2NDQ4MTA4ODB9.omLMV-Q9lt6Fft6hAWNLqa_YnBFMopa73qILS-TR2A8'},

    cleanDb: async function() {
        console.log('--------------------------cleanup database start--------------------------');
        await sequelize.query(
           `TRUNCATE table transaction RESTART IDENTITY`,
            {
              type: QueryTypes.TRUNCATE,
              raw: true
            }
        );
        await sequelize_product.query(
           `TRUNCATE table products RESTART IDENTITY`,
            {
              type: QueryTypes.TRUNCATE,
              raw: true
            }
        );
        console.log('--------------------------cleanup database complete--------------------------');
    },

    auth: function() {

    },

    sendRequest: async function(method, url, body) {
        var options = {};
        options.method = method;
        options.url = url;

        if (body) {
            options.body = body;
        }
        options.headers = { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.context.token };
        options.json = true;

        try {
            return await rp(options);
        } catch (err) {
            console.log('Error while sending a request', err);
        }
    }
};
