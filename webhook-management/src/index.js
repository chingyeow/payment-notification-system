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

    await loaders.keyv.loadKeyv();
    Logger.info('Keyv loaded');

    const server = http.createServer(expressApp);
    server.listen(config.port, () => {
        Logger.info(`Server listening on port ${config.port}`);
    });
};

startServer();

module.exports = startServer;
