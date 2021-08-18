const mongoose = require('mongoose');
const util = require('util');

const config = require('../../config/index');
const { Logger } = require('../ultils/index');

/**
 * Connect to mongodb
 * @returns {mongoose.Collection}
 */
const loadMongoose = async () => {
    await mongoose.connect(config.mongo.url, {
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true,
        user: config.mongo.username,
        pass: config.mongo.password,
    });

    if (config.mongooseDebug) {
        mongoose.set('debug', (collectionName, method, query, doc) => {
            Logger.debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
        });
    }

    mongoose.connection.on('error', (err) => {
        Logger.error(`Unable to connect to database: ${config.mongo.url}, Err: ${err}`);
        throw err;
    });

    return mongoose.connection;
};

/** Disconnect and close mongodb connection */
const unloadMongoose = async () => mongoose.disconnect();

module.exports = {
    loadMongoose,
    unloadMongoose,
};
