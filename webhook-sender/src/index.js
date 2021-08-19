const { Logger } = require('./ultils/index');
const WebhookQueue = require('./jobs/index');
/**
 * Load all dependencies and start server
 */
const startServer = async () => {
    WebhookQueue.process(100, `${process.cwd()}/src/jobs/webhookQueue.processor.js`);

    Logger.info('Webhook-Sender Worker Started!');
};

startServer();

module.exports = startServer;
