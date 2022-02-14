'use strict';
require('module-alias/register');
const Joi = require('joi');

exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'api_routes',
    register: async (server, options) => {
        const Controllers = {
            auth: require('@controllers/authentication')
        };
        server.route([
            {
                method: 'POST',
                path: '/auth',
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 1
                      }
                  },
                  description: 'Auth with DUMMY to get JWT.',
                  auth: {
                      mode: 'try',
                      strategy: 'standard'
                  },
                  validate: {
                      payload: Joi.object({
                        username: Joi.string().required().description('Username.').default('tester'),
                        password: Joi.string().required().description('Password.').default('tester')
                      })
                  },
                  handler: Controllers.auth.login
                }
            },
            {
                method: 'GET',
                path: '/auth/test',
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 2
                      }
                  },
                  description: 'Auth with DUMMY to get JWT.',
                  auth: 'jwt',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true })
                  },
                  handler: Controllers.auth.test
                }
            }
        ]);
    }
};
