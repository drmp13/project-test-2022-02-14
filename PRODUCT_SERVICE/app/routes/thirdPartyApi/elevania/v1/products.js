'use strict';
require('module-alias/register');
const Joi = require('joi');

exports.plugin = {
    pkg: require('@root/package.json'),
    name : 'elevania_routes',
    register: async (server, options) => {
        const Controllers = {
            thirdPartyApi: {
                elevania__v1__products: require('@controllers/thirdParty/elevania/v1/products')
            }
        };
        const api_base_url='/v1/products'
        server.route([
            {
                method: 'GET',
                path: '/init',
                options: {
                  tags: ['api'],
                  description: 'Get Initial Products from Elevenia saved to Database.',
                  auth: 'jwt',
                  validate: {
                    headers: Joi.object({
                      authorization: Joi.string().default('Bearer ')
                    }).options({ allowUnknown: true })
                  },
                  handler: Controllers.thirdPartyApi.elevania__v1__products.init
                }
            }
        ]);
    }
};
