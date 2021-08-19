const Queue = require('bull');

const config = require('../../config/index');

const WebhookQueue = new Queue('webhookQueue', config.redis.url);

module.exports = WebhookQueue;
