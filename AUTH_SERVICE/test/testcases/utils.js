
const dotenv = require('dotenv');
dotenv.config();
const server = require('../../server');
const mongoose = require('mongoose');

const Wreck = require('wreck');
const rp = require('request-promise');
// const request = supertest(server)

module.exports = {
   // request : request,
    context: { api:''},

    cleanDb: async function() {
        console.log('--------------------------cleanup database start--------------------------');
        await mongoose.connection.dropDatabase();
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
