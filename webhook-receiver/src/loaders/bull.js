const Queue = require('bull');

const config = require('../../config/index');

let WebhookQueue = null;

const loadQueue = async () => {
    WebhookQueue = new Queue('webhookQueue', config.redis.url);
};

module.exports = { loadQueue, WebhookQueue };
