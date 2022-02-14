'use strict';
require('module-alias/register');
const Joi = require('joi');

exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'api_routes',
    register: async (server, options) => {
        const Controllers = {
            thirdPartyApi: {
                elevania__v1__products: require('@controllers/web_api/v1/products')
            }
        };
        const api_base_url='/v1/products'
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
                  description: 'Get All Products from Database.',
                  auth: 'jwt',
                  validate: {
                      headers: Joi.object({
                        authorization: Joi.string().default('Bearer ')
                      }).options({ allowUnknown: true }),
                      query: Joi.object({
                          page: Joi.number().positive().required().description('Product page number, only positive number.')
                      })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__products.list
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
                  description: 'Insert new Product.',
                  auth: 'jwt',
                  validate: {
                      headers: Joi.object({
                        authorization: Joi.string().default('Bearer ')
                      }).options({ allowUnknown: true }),
                      payload: Joi.object({
                        name: Joi.string().required().description('Product Name.'),
                        sku: Joi.string().required().description('Product SKU.'),
                        image: Joi.array().items(Joi.object({
                                  'prdImage01':Joi.string().required().description('Main Product Image.'),
                                  'prdImage02':Joi.string().description('Additional Product Image.'),
                                  'prdImage03':Joi.string().description('Additional Product Image.'),
                                  'prdImage04':Joi.string().description('Additional Product Image.'),
                                  'prdImage05':Joi.string().description('Additional Product Image.')
                                })).required().description('Product Image.'),
                        price: Joi.number().positive().required().description('Product Price.').default(100000),
                        stock: Joi.number().positive().required().description('Product Stock.').default(100),
                        description: Joi.string().description('Product Description.')
                      })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__products.create
                }
            },
            {
                method: 'GET',
                path: api_base_url+'/{productID}',
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 3
                      }
                  },
                  description: 'Get Product Detail from Database.',
                  auth: 'jwt',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true }),
                    params: Joi.object({
                        productID: Joi.number().positive().required().description('Product ID')
                    })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__products.detail
                }
            },
            {
                method: 'PATCH',
                path: api_base_url+'/{productID}',
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 4
                      }
                  },
                  description: 'Update Product.',
                  auth: 'jwt',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true }),
                    params: Joi.object({
                        productID: Joi.number().positive().required().description('Product ID')
                    }),
                    payload: Joi.object({
                      name: Joi.string().required().description('Product Name.'),
                      sku: Joi.string().required().description('Product SKU.'),
                      image: Joi.array().items(Joi.object({
                                'prdImage01':Joi.string().required().description('Main Product Image.'),
                                'prdImage02':Joi.string().description('Additional Product Image.'),
                                'prdImage03':Joi.string().description('Additional Product Image.'),
                                'prdImage04':Joi.string().description('Additional Product Image.'),
                                'prdImage05':Joi.string().description('Additional Product Image.')
                              })).required().description('Product Image.'),
                      price: Joi.number().positive().required().description('Product Price.').default(100000),
                      stock: Joi.number().positive().required().description('Product Stock.').default(100),
                      description: Joi.string().description('Product Description.')
                    })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__products.update
                }
            },
            {
                method: 'DELETE',
                path: api_base_url+'/{productID}',
                options: {
                  tags: ['api'],
                  plugins: {
                      'hapi-swagger': {
                          order: 5
                      }
                  },
                  description: 'Delete Product.',
                  auth: 'jwt',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true }),
                    params: Joi.object({
                        productID: Joi.number().positive().required().description('Product ID')
                    })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__products.delete
                }
            },
        ]);
    }
};
