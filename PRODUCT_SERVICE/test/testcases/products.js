var chai = require('chai');
var should = chai.should;
var expect = chai.expect;
should();
const utils = require('./utils');
let context = utils.context;
describe('Products', async () => {
    // describe('GET /init',  () => {
    //     console.log('-------------------------- third party-api --------------------------');
    //     it('should get data from elevania ', (done) => {
    //       context.request
    //           .get('/init')
    //           .set('content-type', 'application/json')
    //           .set('authorization', context.token)
    //           .expect(200, done);
    //     }).timeout(1800000);
    // });
    describe('GET /v1',  () => {
        console.log('-------------------------- product-service --------------------------');
        it('should get products from database ', (done) => {
          context.request
              .get(context.api+'/products?page=1')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .expect(200, done);
        });
        it('should create new product', (done) => {
          context.request
              .post(context.api+'/products')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .send({
                "name": "Product A",
                "sku": "SKU-1",
                "image": [
                  {
                    "prdImage01": "string",
                    "prdImage02": "string",
                    "prdImage03": "string",
                    "prdImage04": "string",
                    "prdImage05": "string"
                  }
                ],
                "price": 100000,
                "stock": 100,
                "description": "string"
              })
              .expect(201, done);
        });
        it("shouldn't create new product because duplicate SKU", (done) => {
          context.request
              .post(context.api+'/products')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .send({
                "name": "Product B",
                "sku": "SKU-1",
                "image": [
                  {
                    "prdImage01": "string",
                    "prdImage02": "string",
                    "prdImage03": "string",
                    "prdImage04": "string",
                    "prdImage05": "string"
                  }
                ],
                "price": 100000,
                "stock": 100,
                "description": "string"
              })
              .expect(409, done);
        });
        it("should get product detail", (done) => {
          context.request
              .get(context.api+'/products/1')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .expect(200, done);
        });
        it("should update product", (done) => {
          context.request
              .patch(context.api+'/products/1')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .send({
                "name": "Product C",
                "sku": "SKU-2",
                "image": [
                  {
                    "prdImage01": "string",
                    "prdImage02": "string",
                    "prdImage03": "string",
                    "prdImage04": "string",
                    "prdImage05": "string"
                  }
                ],
                "price": 100000,
                "stock": 100,
                "description": "string"
              })
              .expect(200, done);
        });
        it("should delete product", (done) => {
          context.request
              .delete(context.api+'/products/1')
              .set('content-type', 'application/json')
              .set('authorization', context.token)
              .expect(200, done);
        });
    });
});
