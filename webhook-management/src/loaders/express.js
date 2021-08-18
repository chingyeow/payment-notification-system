const express = require('express');
const expressWinston = require('express-winston');
const helmet = require('helmet');
const cors = require('cors');
const createError = require('http-errors');
const { Logger } = require('../ultils/index');

const config = require('../../config/index');

const apiArray = require('../api/index');

/**
 * Load express app for the first time
 * @returns {Express}
 */
const loadExpress = async () => {
    const app = express();

    // enable detailed API logging in dev env
    if (config.env === 'development') {
        expressWinston.requestWhitelist.push('body');
        expressWinston.responseWhitelist.push('body');
        app.use(
            expressWinston.logger({
                winstonInstance: Logger,
                meta: true,
                msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
                colorStatus: true,
            })
        );
    }

    // healthcheck endpoint
    app.get(`${config.api.prefix}/health`, (req, res) => {
        res.status(200).end();
    });
    app.head(`${config.api.prefix}/health`, (req, res) => {
        res.status(200).end();
    });

    // init middlewares
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // mount all router in the api folder
    apiArray.forEach((element) => {
        app.use(`${config.api.prefix}/${element.apiName}`, element.router);
    });

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });

    // log error in winston transports except when executing test suite
    if (config.env !== 'test') {
        app.use(
            expressWinston.errorLogger({
                winstonInstance: Logger,
            })
        );
    }

    // error handler, send stacktrace only during development
    app.use(
        (
            err,
            req,
            res,
            next // eslint-disable-line no-unused-vars
        ) =>
            res.status(err.status || 500).json({
                code: res.statusCode,
                method: req.method,
                message: err.message,
                stack: config.env === 'development' ? err.stack : {},
            })
    );

    return app;
};

module.exports = {
    loadExpress,
};
