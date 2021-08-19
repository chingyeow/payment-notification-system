const Joi = require('joi');
const envFound = require('dotenv').config();

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(8080),
    REDIS_URL: Joi.string().required(),
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
    redis: {
        url: envVars.REDIS_URL,
    },
};

module.exports = config;
