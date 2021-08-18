// /* eslint-disable no-underscore-dangle */
// /* eslint-disable node/no-unpublished-require */
// /* eslint-env mocha */
// const { expect } = require('chai');
// const request = require('supertest');

// const MockDb = require('../ultils/mockDb');
// const Express = require('../loaders/express');
// const config = require('../../config/index');

// let app = null;
// let server = null;

// describe('Webhook API Test', () => {
//     const mockWebhook = {
//         url: 'https://www.google.com',
//         name: 'testing name',
//         merchantId: 'asjhdkjhasd23',
//         key: 'hasdkjhaskjdhkjaskjdhhk',
//     };

//     before(async () => {
//         await MockDb.dbConnect();
//         app = await Express.loadExpress();
//         server = app.listen(config.port);
//     });

//     after(async () => {
//         await MockDb.dbDisconnect();
//         server.close();
//     });

//     describe('POST /webhooks', () => {
//         it('should create a webhook subscription and return an object of comment with 200 status code', async () => {
//             const res = await request(app).post(`${config.api.prefix}/webhooks`).send(mockWebhook);

//             expect(res.body.message).to.be.an('object');
//             expect(res.body.message).to.have.property('_id');
//             expect(res.body.message).to.have.property('createdAt');
//             expect(res.body.message).to.have.property('updatedAt');
//             expect(res.body.message).to.have.property('url');
//             expect(res.body.message).to.have.property('name');
//             expect(res.body.message).to.have.property('merchantId');
//             expect(res.body.message).to.have.property('key');
//             expect(res.body.message.url).to.be.equal(mockWebhook.url);
//             expect(res.body.message.name).to.be.equal(mockWebhook.name);
//             expect(res.body.message.merchantId).to.be.equal(mockWebhook.merchantId);
//             expect(res.body.message.key).to.be.equal(mockWebhook.key);
//             expect(res.statusCode).to.equal(200);

//             mockWebhook._id = res.body.message._id;
//             mockWebhook.key = res.body.message.key;
//             mockWebhook.createdAt = res.body.message.createdAt;
//             mockWebhook.updatedAt = res.body.message.updatedAt;
//         });
//     });

//     describe('GET /webhooks', () => {
//         it('should return an array of webhook subscriptions with 200 status code', async () => {
//             const res = await request(app).get(`${config.api.prefix}/webhooks`);
//             expect(res.body.message).to.be.an('array');
//             expect(res.body.message.length).to.be.equal(1);
//             expect(res.statusCode).to.equal(200);
//         });
//     });

//     describe('GET /webhooks/:id', () => {
//         it('should return an webhook subscriptions with 200 status code', async () => {
//             const res = await request(app).get(`${config.api.prefix}/webhooks/${mockWebhook._id}`);
//             expect(res.body.message).to.be.an('object');
//             expect(res.body.message).to.have.property('_id');
//             expect(res.body.message).to.have.property('createdAt');
//             expect(res.body.message).to.have.property('updatedAt');
//             expect(res.body.message).to.have.property('url');
//             expect(res.body.message).to.have.property('name');
//             expect(res.body.message).to.have.property('merchantId');
//             expect(res.body.message).to.have.property('key');
//             expect(res.body.message._id).to.be.equal(mockWebhook._id);
//             expect(res.body.message.key).to.be.equal(mockWebhook.key);
//             expect(res.body.message.url).to.be.equal(mockWebhook.url);
//             expect(res.body.message.name).to.be.equal(mockWebhook.name);
//             expect(res.body.message.merchantId).to.be.equal(mockWebhook.merchantId);
//             expect(res.statusCode).to.equal(200);
//         });
//     });

//     describe('PATCH /webhooks/:id', () => {
//         it('should update a webhook subscription and return an object of comment with 200 status code', async () => {
//             const payload = {
//                 name: 'testing 123',
//             };

//             const res = await request(app).patch(`${config.api.prefix}/webhooks/${mockWebhook._id}`).send(payload);

//             expect(res.body.message).to.be.an('object');
//             expect(res.body.message.n).to.be.equal(1);
//             expect(res.body.message.nModified).to.be.equal(1);
//             expect(res.body.message.ok).to.be.equal(1);
//             expect(res.statusCode).to.equal(200);
//         });
//     });

//     describe('DELETE /webhooks/:id', () => {
//         it('should delete webhook by id and return object of modification count with 200 status code', async () => {
//             const res1 = await request(app).delete(`${config.api.prefix}/webhooks/${mockWebhook._id}`);
//             const res2 = await request(app).get(`${config.api.prefix}/webhooks/${mockWebhook._id}`);

//             expect(res1.body.message).to.be.an('object');
//             expect(res1.statusCode).to.equal(200);

//             expect(res2.body.message).to.be.equal('No Result Was Found');
//             expect(res2.statusCode).to.equal(200);
//         });
//     });
// });
