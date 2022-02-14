'use strict';

exports.plugin = {
  register: (server, options) => {
    server.auth.strategy('jwt', 'jwt', {
      key: options.key,
      validate: validate, // validate function defined above
      verifyOptions: {
        algorithms: options.algorithm
      }
      // Uncomment this to apply default auth to all routes
      //plugin.auth.default('jwt');
    });
  },
  name: 'jwt-auth'
};

// bring your own validation function
const validate = async (decoded, request) => {
  try {
    let username = decoded.username;
    request.headers.userdata = {
      username: username,
      api_key__elevania : decoded.api_key__elevania
    }
    if (username!='') {
      return {
        isValid: true
      };
    } else {
      console.log('Invalid Credential');
      return {
        isValid: false
      };
    }
  } catch (error) {
    return {
      isValid: false
    };
  }
};
