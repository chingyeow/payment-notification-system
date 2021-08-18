const axios = require('axios');

const config = require('../../../config');
const { WebhookQueue } = require('../../loaders/bull');

/**
 * Notify merchant by adding to the task queue
 * @param {string} id
 * @param {string} callbackId
 * @param {string} partnerId
 * @param {string} merchantId
 * @param {string} merchantAccount
 * @param {string} timestamp
 * @param {number} amount
 * @returns {string} Bull Queue Job ID
 */
const notifyMerchant = async (id, callbackId, partnerId, merchantId, merchantAccount, timestamp, amount) => {
    if (
        id === undefined ||
        callbackId === undefined ||
        partnerId === undefined ||
        merchantId === undefined ||
        merchantAccount === undefined ||
        timestamp === undefined ||
        amount === undefined ||
        id === null ||
        callbackId === null ||
        partnerId === null ||
        merchantId === null ||
        merchantAccount === null ||
        timestamp === null ||
        amount === null
    ) {
        throw new Error('Missing Parameters');
    }

    const response = await axios.get(`${config.webhooksMgmtUrl}/merchant/${merchantId}`);

    return WebhookQueue.add(
        {
            id,
            callbackId,
            partnerId,
            merchantId,
            merchantAccount,
            timestamp,
            amount,
            key: response.message.key,
        },
        {
            attempts: 6,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        }
    );
};

module.exports = {
    notifyMerchant,
};
