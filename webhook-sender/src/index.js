const loaders = require('./loaders/index');
const { Logger } = require('./ultils/index');

/**
 * Load all dependencies and start server
 */
const startServer = async () => {
    await loaders.bull.loadQueue();
    Logger.info('Bull Queue loaded');
    Logger.info('Webhook-Sender Worker Started!');
};

startServer();

module.exports = startServer;
