const http = require('http');
const config = require('../config/index');
const loaders = require('./loaders/index');
const { Logger } = require('./ultils/index');

/**
 * Load all dependencies and start server
 */
const startServer = async () => {
    const expressApp = await loaders.express.loadExpress();
    Logger.info('Express loaded');

    await loaders.bull.loadQueue();
    Logger.info('Bull Queue loaded');

    const server = http.createServer(expressApp);
    server.listen(config.port, () => {
        Logger.info(`Server listening on port ${config.port}`);
    });

    Logger.info(`Webhook-Receiver Started!`);
};

startServer();

module.exports = startServer;
