'use strict';
require('module-alias/register');
const Joi = require('joi');

exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'api_routes',
    register: async (server, options) => {
        const Controllers = {
            thirdPartyApi: {
                elevania__v1__transaction: require('@controllers/web_api/v1/transaction')
            }
        };
        const api_base_url='/v1/transactions'
        server.route([
            {
                method: 'GET',
                path: api_base_url,
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 1
                      }
                  },
                  description: 'Get All Transaction from Database.',
                  auth: 'jwt',
                  validate: {
                      headers: Joi.object({
                        authorization: Joi.string().default('Bearer ')
                      }).options({ allowUnknown: true }),
                      query: Joi.object({
                          page: Joi.number().positive().required().description('Transaction page number, only positive number.')
                      })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__transaction.list
                }
            },
            {
                method: 'POST',
                path: api_base_url,
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 2
                      }
                  },
                  description: 'Insert new Transaction.',
                  auth: 'jwt',
                  validate: {
                      headers: Joi.object({
                        authorization: Joi.string().default('Bearer ')
                      }).options({ allowUnknown: true }),
                      payload: Joi.object({
                        sku: Joi.string().required().description('Product SKU.').default("SKU-PRODUCT"),
                        qty: Joi.number().required().description('Product Quantity.').default(1)
                      })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__transaction.create
                }
            },
            {
                method: 'GET',
                path: api_base_url+'/{transactionID}',
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 3
                      }
                  },
                  description: 'Get Transaction Detail from Database.',
                  auth: 'jwt',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true }),
                    params: Joi.object({
                        transactionID: Joi.number().positive().required().description('Transaction ID')
                    })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__transaction.detail
                }
            },
            {
                method: 'PATCH',
                path: api_base_url+'/{transactionID}',
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 4
                      }
                  },
                  description: 'Update Transaction.',
                  auth: 'jwt',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true }),
                    params: Joi.object({
                        transactionID: Joi.number().positive().required().description('Transaction ID')
                    }),
                    payload: Joi.object({
                      qty: Joi.number().required().description('Product Quantity.').default(1)
                    })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__transaction.update
                }
            },
            {
                method: 'DELETE',
                path: api_base_url+'/{transactionID}',
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 5
                      }
                  },
                  description: 'Delete Transaction.',
                  auth: 'jwt',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true }),
                    params: Joi.object({
                        transactionID: Joi.number().positive().required().description('Transaction ID')
                    })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__transaction.delete
                }
            },
        ]);
    }
};
