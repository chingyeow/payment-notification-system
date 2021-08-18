/* eslint-disable global-require */
module.exports = {
    Logger: require('./logger'),
    MockDb: process.env.NODE_ENV === 'development' ? require('./mockDb') : null,
};
