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

    await loaders.mongoose.loadMongoose();
    Logger.info('Mongoose loaded');

    await loaders.bull.loadBullListener();
    Logger.info('Bull Queue Listener loaded');

    const server = http.createServer(expressApp);
    server.listen(config.port, () => {
        Logger.info(`Server listening on port ${config.port}`);
    });

    Logger.info(`Webhook-Management Started!`);
};

startServer();

module.exports = startServer;
