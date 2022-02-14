'use strict';
require('module-alias/register');
const Joi = require('joi');
const responseHelper = require('@helpers/response');

exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'core_routes',
    register: async (server, options) => {
        server.route([
            {
                method: 'GET',
                path: '/',
                options: {
                  plugins: {
                      'hapi-swagger': {
                          order: 1
                      }
                  },
                  description: 'Base route.',
                  auth: {
                      mode: 'try',
                      strategy: 'standard'
                  },
                  handler: async (request, h) => {
                    return responseHelper.sendResponseHTTP(h, 200, "Adjustment Transaction Service");
                  }
                }
            }
        ]);
    }
};
