const utils = require('./testcases/utils');

describe('Authentication Service', () => {
    before((done) => {
        // console.log('--------------------------before hook start--------------------------');
        // utils.cleanDb()
        //     .then(async function() {
        //         console.log('--------------------------before hook complete--------------------------');
        //         done();
        //     }).catch(function(err) {
        //         console.log('error in before hook: ', err);
        //     });
        done();
    });

    after((done) => {
        // console.log('--------------------------after hook start--------------------------');
        // utils.cleanDb()
        //     .then(function() {
        //         console.log('--------------------------after hook complete--------------------------');
        //         done();
        //     }).catch(function(err) {
        //         console.log('error in after hook: ', err);
        //     });
        done();
    });

    describe('Test cases', () => {
        console.log('--------------------------test cases start--------------------------');
        require('./testcases/server.js');
        require('./testcases/auth.js');
        console.log('--------------------------test cases completed--------------------------');
    });
});
