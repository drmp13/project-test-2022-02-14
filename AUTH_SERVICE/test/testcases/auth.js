var chai = require('chai');
var should = chai.should;
var expect = chai.expect;
should();
const utils = require('./utils');
let context = utils.context;
describe('Authentication', async () => {
    describe('POST /auth',  () => {
        console.log('-------------------------- authentication --------------------------');
        it('should not return JWT if username and password doest not match', (done) => {
          context.request
              .post(context.api+'/auth')
              .set('content-type', 'application/json')
              .send({
                  username: 'tester',
                  password: 'wrong_password'
                })
              .expect(401, done);
        });
        it('should return JWT if username and password does match', (done) => {
            context.request
              .post(context.api+'/auth')
              .set('content-type', 'application/json')
              .send({
                  username: 'tester',
                  password: 'tester'
                })
              .end(function(err, res) {
                res.statusCode.should.equal(200);
                res.body.data.should.have.property('access-token');
                context.token = res.body.data['access-token'];
                done();
              })
        });
    });
    describe('POST /auth/test',  () => {
        console.log('-------------------------- authentication test --------------------------');
        it('test request using token', (done) => {
          context.request
              .get(context.api+'/auth/test')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .expect(200, done);
        });
    });
});
