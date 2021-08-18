// /* eslint-disable no-underscore-dangle */
// /* eslint-disable node/no-unpublished-require */
// /* eslint-env mocha */
// const { expect } = require('chai');

// const MockDb = require('../../ultils/mockDb');

// const WebhookModel = require('./webhook.model');
// const WebhookService = require('./webhook.service');

// describe('Webhook Model Test', () => {
//     before(async () => {
//         await MockDb.dbConnect();
//     });

//     after(async () => {
//         await MockDb.dbDisconnect();
//     });

//     it('should be invalid if all parameters are not provided', (done) => {
//         const model = new WebhookModel({});
//         const err = model.validateSync();

//         expect(err.errors.url.message).to.equal('Path `url` is required.');
//         expect(err.errors.name.message).to.equal('Path `name` is required.');
//         expect(err.errors.merchantId.message).to.equal('Path `merchantId` is required.');
//         expect(err.errors.key.message).to.equal('Path `key` is required.');

//         done();
//     });

//     it('should create a webhook subscription', (done) => {
//         const model = new WebhookModel({
//             url: 'https://www.google.com',
//             key: 'asdasdasd',
//             name: 'testi name',
//             merchantId: 'asjhdkjhasd23',
//             enabled: true,
//         });
//         model.save().then((savedDoc) => {
//             expect(savedDoc.org).to.equal(model.org);
//             expect(savedDoc.comment).to.equal(model.comment);
//             done();
//         });
//     });

//     it('should return the correct webhook by ID', (done) => {
//         const model = new WebhookModel({
//             url: 'https://www.google.com',
//             key: 'asdasdasd',
//             name: 'testi name',
//             merchantId: 'asjhdkjhasd23',
//             enabled: true,
//         });
//         model.save().then((savedDoc) => {
//             WebhookModel.findById(savedDoc._id).then((result) => {
//                 expect(savedDoc._id).to.eql(result._id);
//                 expect(savedDoc.url).to.equal(result.url);
//                 expect(savedDoc.key).to.equal(result.key);
//                 expect(savedDoc.name).to.equal(result.name);
//                 expect(savedDoc.merchantId).to.equal(result.merchantId);
//                 expect(savedDoc.enabled).to.equal(result.enabled);
//                 done();
//             });
//         });
//     });

//     it('should return null if provided ID is null', (done) => {
//         WebhookModel.findById(null).then((result) => {
//             expect(result).to.equal(null);
//             done();
//         });
//     });
// });

// describe('Webhook Service Test', () => {
//     const mockWebhook = {
//         url: 'https://www.google.com',
//         name: 'testi name',
//         key: 'asdasdasd',
//         merchantId: 'asjhdkjhasd23',
//         enabled: true,
//     };

//     before(async () => {
//         await MockDb.dbConnect();
//     });

//     after(async () => {
//         await MockDb.dbDisconnect();
//     });

//     it('should create a webhook and return the promise that resolve to a saved document', (done) => {
//         WebhookService.createWebhook(
//             mockWebhook.url,
//             mockWebhook.name,
//             mockWebhook.merchantId,
//             mockWebhook.key,
//             mockWebhook.enabled
//         ).then((result) => {
//             expect(result.url).to.be.equal(mockWebhook.url);
//             expect(result.name).to.be.equal(mockWebhook.name);
//             expect(result.merchantId).to.be.equal(mockWebhook.merchantId);
//             expect(result.key).to.be.equal(mockWebhook.key);
//             expect(result.enabled).to.be.equal(mockWebhook.enabled);
//             expect(result).to.have.property('_id');
//             expect(result).to.have.property('createdAt');
//             expect(result).to.have.property('updatedAt');

//             mockWebhook._id = result._id;

//             done();
//         });
//     });

//     it('should throw an error if parameters were not provided to createWebhook method', (done) => {
//         expect(() => WebhookService.createWebhook()).to.throw(Error);
//         done();
//     });

//     it('should get all webhook subscription and return only 1 result', (done) => {
//         WebhookService.getWebhooks().then((results) => {
//             expect(results.length).to.be.equal(1);
//             done();
//         });
//     });

//     it('should update a webhook subscription and return total modified', (done) => {
//         mockWebhook.enabled = false;

//         WebhookService.updateWebhookById(mockWebhook._id, mockWebhook).then((results) => {
//             expect(results.n).to.be.equal(1);
//             expect(results.nModified).to.be.equal(1);
//             expect(results.ok).to.be.equal(1);
//             done();
//         });
//     });

//     it('should delete webhook by id and no result will be returned from the getWebhooks method', (done) => {
//         WebhookService.deleteWebhookById(mockWebhook._id).then(() => {
//             WebhookService.getWebhooks().then((results) => {
//                 expect(results.length).to.be.equal(0);
//                 delete mockWebhook._id;
//                 done();
//             });
//         });
//     });

//     it('should create a webhook and getWebhooks method should only return 1 result', (done) => {
//         WebhookService.createWebhook(
//             mockWebhook.url,
//             mockWebhook.name,
//             mockWebhook.merchantId,
//             mockWebhook.key,
//             mockWebhook.enabled
//         ).then(() => {
//             WebhookService.getWebhooks().then((results) => {
//                 expect(results.length).to.be.equal(1);
//                 done();
//             });
//         });
//     });
// });
