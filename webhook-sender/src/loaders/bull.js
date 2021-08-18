const Queue = require('bull');

const config = require('../../config/index');

let WebhookQueue = null;

const loadQueue = async () => {
    WebhookQueue = new Queue('webhookQueue', config.redis.url);
    WebhookQueue.process(100, `${process.cwd()}/src/jobs/webhookQueue.processor.js`);
};

module.exports = { loadQueue, WebhookQueue };
