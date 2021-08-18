/* eslint-disable no-underscore-dangle */
const { WebhookQueue } = require('../loaders/bull');

const { Logger } = require('../ultils/index');
/**
 * Log completed jobs
 */
WebhookQueue.on('global:completed', (jobId) => {
    WebhookQueue.getJob(jobId).then(async () => {
        Logger.debug(`Job ${jobId} completed!`);
    });
});
