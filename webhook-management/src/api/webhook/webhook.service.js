const WebhookModel = require('./webhook.model');

/**
 * Create new webhook subscription
 * @param {string} url
 * @param {string} name
 * @param {string} merchantId
 * @param {string} key
 * @param {boolean} enabled
 * @returns {Promise} Promise object that would resolve to the mongoose saved document
 */
const createWebhook = (url, name, merchantId, key, enabled = true) => {
    if (
        url === undefined ||
        name === undefined ||
        merchantId === undefined ||
        key === undefined ||
        url === null ||
        name === null ||
        merchantId === null ||
        key === null
    ) {
        throw new Error('Missing Parameters');
    }

    const newModel = new WebhookModel({ url, key, name, merchantId, enabled });

    return newModel.save();
};

/**
 * Get all webhook subscriptions
 * @returns {Promise} Promise object that would resolve to all documents in the collection that was not soft deleted
 */
const getWebhooks = () => WebhookModel.find({});

/**
 * Get one webhook subscription by id
 * @returns {Promise} Promise object that would resolve to all documents in the collection that was not soft deleted
 */
const getWebhookById = (id) => WebhookModel.findById(id);

/**
 * Get one webhook subscription by merchant id
 * @returns {Promise} Promise object that would resolve to all documents in the collection that was not soft deleted
 */
const getWebhookByMerchantId = (id) => WebhookModel.findOne({ merchantId: id });

/**
 *
 * @param {string} id
 * @param {object} payload
 * @returns {Promise} Promise object that would resolve to the details of the operation
 */
const updateWebhookById = (id, payload) => WebhookModel.updateOne({ _id: id }, payload);

/**
 * Delete webbook by id
 * @param {string} id
 * @returns {Promise} Promise object that would resolve to the number of documents that was modified
 */
const deleteWebhookById = (id) => WebhookModel.findOneAndDelete({ _id: id });

module.exports = {
    createWebhook,
    getWebhooks,
    getWebhookById,
    getWebhookByMerchantId,
    updateWebhookById,
    deleteWebhookById,
};
