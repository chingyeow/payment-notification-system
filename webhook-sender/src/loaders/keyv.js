const Keyv = require('keyv');
const config = require('../../config/index');
const { Logger } = require('../ultils/index');

let keyv = null;

const loadKeyv = async () => {
    keyv = new Keyv(config.redis.url);

    // Handle DB connection errors
    keyv.on('error', (err) => {
        Logger.error(`Unable to connect to keyv redis: ${config.redis.url}, Err: ${err}`);
        throw err;
    });
};

module.exports = { loadKeyv, keyv };
