var chai = require('chai');
var should = chai.should;
var expect = chai.expect;
should();
const utils = require('./utils');
let context = utils.context;

const ProductModel = require("@models/productModel");
const productModel = new ProductModel();



describe('Transaction', async () => {
    describe('GET /v1',  () => {
        console.log('-------------------------- adjustment-transaction-service --------------------------');
        it('should get transactions from database ', (done) => {
          context.request
              .get(context.api+'/transactions?page=1')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .expect(200, done);
        });
        it("shouldn't create new transaction because product unknown", (done) => {
          productModel.seedTestData();
          context.request
              .post(context.api+'/transactions')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .send({
                "sku": "SKU-2",
                "qty": 91
              })
              .expect(404, done);
        });
        it('should create new transaction', (done) => {
          productModel.seedTestData();
          context.request
              .post(context.api+'/transactions')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .send({
                "sku": "SKU-1",
                "qty": 10
              })
              .expect(201, done);
        });
        it("shouldn't create new transaction because out of stock", (done) => {
          productModel.seedTestData();
          context.request
              .post(context.api+'/transactions')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .send({
                "sku": "SKU-1",
                "qty": 91
              })
              .expect(409, done);
        });
        it('should create new transaction (return stock)', (done) => {
          productModel.seedTestData();
          context.request
              .post(context.api+'/transactions')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .send({
                "sku": "SKU-1",
                "qty": -10
              })
              .expect(201, done);
        });
        it("should get transaction detail", (done) => {
          context.request
              .get(context.api+'/transactions/1')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .expect(200, done);
        });
        it("should update transaction", (done) => {
          context.request
              .patch(context.api+'/transactions/1')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .send({
                "qty": 100
              })
              .expect(200, done);
        });
        it("should delete transaction", (done) => {
          context.request
              .delete(context.api+'/transactions/1')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .expect(200, done);
        });
    });
});
