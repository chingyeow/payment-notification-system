const Joi = require('joi');
const envFound = require('dotenv').config();

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(8080),
    LOG_LEVEL: Joi.string().valid('error', 'warn', 'http', 'verbose', 'debug', 'silly').default('silly'),
    API_PREFIX: Joi.string().required(),
    REDIS_URL: Joi.string().required(),
    WEBHOOKS_MGMT_URL: Joi.string().required(),
})
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    log: {
        level: envVars.LOG_LEVEL,
    },
    api: {
        prefix: envVars.API_PREFIX,
    },
    redis: {
        url: envVars.REDIS_URL,
    },
    webhooksMgmtUrl: envVars.WEBHOOKS_MGMT_URL,
};

module.exports = config;
