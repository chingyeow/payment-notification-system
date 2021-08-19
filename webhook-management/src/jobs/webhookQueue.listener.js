/* eslint-disable no-underscore-dangle */
const WebhookQueue = require('./index');
const WebhookService = require('../api/webhook/webhook.service');

/**
 * When failed jobs left with 0 attempts, push jobId into webhook failedJobs array
 */
WebhookQueue.on('global:failed', (jobId) => {
    WebhookQueue.getJob(jobId).then(async (job) => {
        const attemptsLeft = job.opts.attempts - job.attemptsMade;

        if (attemptsLeft <= 0) {
            const { failedJobs } = job.data;
            failedJobs.push({ jobId });
            WebhookService.updateWebhookById(job.data._id, { failedJobs });
        }
    });
});
