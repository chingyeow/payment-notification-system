const Joi = require('joi');

const receiveWebhook = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        callback_id: Joi.string().required(),
        partner_id: Joi.string().required(),
        merchant_id: Joi.string().required(),
        merchant_account_number: Joi.string().required(),
        customer_id: Joi.string().required(),
        transaction_timestamp: Joi.date().required(),
        amount: Joi.number().required(),
    }),
};

module.exports = { receiveWebhook };
