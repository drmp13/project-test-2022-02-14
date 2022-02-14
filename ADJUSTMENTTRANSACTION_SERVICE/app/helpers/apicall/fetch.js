'use strict';
const axios = require('axios').default;

exports.getResponse = async function (request) {
    var call_response;

    await axios(request)
    .then(function (response) {
      call_response = response;
      call_response.fetch_status = "success";
    })
    .catch(function (error) {
      call_response=error.response;
      call_response.fetch_status = "failed";
    })
    .then(function () {
      // always executed
    });

    return call_response;


};
