const Joi = require('joi');

const createWebhook = {
    body: Joi.object().keys({
        url: Joi.string().required(),
        name: Joi.string().required(),
        merchantId: Joi.string().required(),
        key: Joi.string().required(),
    }),
};

const updateWebhook = {
    body: Joi.object().keys({
        url: Joi.string(),
        name: Joi.string(),
        merchantId: Joi.string(),
        key: Joi.string(),
    }),
};

module.exports = { createWebhook, updateWebhook };
