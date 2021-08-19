/* eslint-disable no-underscore-dangle */
const WebhookQueue = require('../jobs/index');
const WebhookService = require('../api/webhook/webhook.service');

const { Logger } = require('../ultils/index');

/**
 * When failed jobs left with 0 attempts, push jobId into webhook failedJobs array
 */
const loadBullListener = async () => {
    WebhookQueue.on('global:failed', (jobId) => {
        WebhookQueue.getJob(jobId).then(async (job) => {
            const attemptsLeft = job.opts.attempts - job.attemptsMade;

            Logger.debug(`Job ID ${jobId} failed! Attempt Left: ${attemptsLeft}`);

            if (attemptsLeft <= 0) {
                const { merchantId } = job.data;

                const doc = await WebhookService.getWebhookByMerchantId(merchantId);

                Logger.debug(`Save Job ID ${jobId} into doc: ${JSON.stringify(doc)}`);

                const { failedJobs } = doc;

                failedJobs.push({ jobId });

                WebhookService.updateWebhookById(doc._id, failedJobs);
            }
        });
    });
};

module.exports = { loadBullListener };
