const winston = require('winston');

const options = {
    file: {
        level: 'info',
        filename: './logs/app.log',
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        // Specialized formatter for console - for better readability
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf((info) => {
                const { level, timestamp } = info;

                // eslint-disable-next-line no-param-reassign
                delete info.level;
                // eslint-disable-next-line no-param-reassign
                delete info.timestamp;

                return `${timestamp} ${level}: ${
                    // eslint-disable-next-line no-nested-ternary
                    info.message && typeof info.message !== 'string'
                        ? JSON.stringify(info.message).replace(/\\n/g, '\n')
                        : !info.message || info.stack
                        ? JSON.stringify(info).replace(/\\n/g, '\n')
                        : info.message
                }`;
            })
        ),
    },
};

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
    exitOnError: false,
});

module.exports = logger;
