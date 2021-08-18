/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const glob = require('glob');
const path = require('path');

const apiArr = [];

// use glob to match all routers present in the folder
glob.sync('./src/api/*/index.js').forEach((file) => {
    apiArr.push(require(path.resolve(file)));
});

module.exports = apiArr;
