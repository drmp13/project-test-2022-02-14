'use strict';

const Confidence = require('confidence');
const Config = require('./config');
const Meta = require('./meta');
const Pack = require('../package');

let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

internals.manifest = {
    $meta: 'App manifest document',
    server: {
        host : process.env.SERVER_HOST,
        port: Config.get('/port').web,
        routes: { cors: { origin: ["*"] }}
    },
    register: {
        plugins : [
        //**************************************************************
        //                                                             *
        //                      COMMON PLUGINS                         *
        //                                                             *
        //**************************************************************

        // App context decorator
        {
            plugin: './lib/context',
            options: {
                meta: Meta.get('/')
            }
        },
        // Logging connector
        {
            plugin:  'good',
            options: Config.get('/good')
        },

        //**************************************************************
        //                                                             *
        //                      WEB PLUGINS                            *
        //                                                             *
        //**************************************************************

        // Cookie authentication
        {
            plugin: 'hapi-auth-cookie',
            options: {
                select: ['web']
            }
        },
        //  Crumb
        {
            plugin:'crumb',
                options: {
                    cookieOptions: {
                        isSecure: false
                    },
                    skip: function(request, reply) {
                        if (request.path && request.path.indexOf('/auth') > -1) {
                            return true;
                        }
                    }
            }
        },
        // Static file and directory handlers
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
        // Swagger support
        {
            plugin: 'hapi-swagger',
            options: {
                    info: {
                        title: 'Authentication Service',
                        version: Pack.version,
                    },
                    host: 'localhost:'+process.env.PORT,
                    sortEndpoints: 'ordered'
                    // securityDefinitions: {
                    //     'jwt': {
                    //         'type': 'apiKey',
                    //         'name': 'Authorization',
                    //         'in': 'header'
                    //     }
                    // },
                    // security: [{ 'jwt': [] }]
                }
        },
        // Views loader

        // Flash Plugin
        {
            plugin: './lib/flash'
        },
        // Hapi cookie jar
        {
            plugin: 'yar',
            options: Config.get('/yarCookie')
        },
        //  Authentication strategy
        {
            plugin: './lib/auth',
            options: Config.get('/authCookie')
        },

        //**************************************************************
        //                                                             *
        //                      API PLUGINS                            *
        //                                                             *
        //**************************************************************

        // JWT authentication
        {
            plugin: 'hapi-auth-jwt2',
        },
        // //  JWT-Authentication strategy
        {
            plugin:  './lib/jwtAuth',
            options: Config.get('/jwtAuthOptions')
        },

        //**************************************************************
        //                                                             *
        //                      APPLICATION ROUTES                     *
        //                                                             *
        //**************************************************************

        /* ----------------- Start routes -------------- */
        {
            plugin: '@routes/_core.js'
        },
        {
            plugin: '@routes/authentication.js'
        },

        /* ----------------- End routes  -------------- */

        ]
    }
};

internals.store = new Confidence.Store(internals.manifest);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};

exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
