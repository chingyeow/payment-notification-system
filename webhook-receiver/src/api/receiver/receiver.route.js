/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const { validate } = require('express-validation');

const ReceiverService = require('./receiver.service');
const ReceiverValidation = require('./receiver.validation');

const router = express.Router();

/**
 * Receive notification form partner and add a new job to send out the notification
 */
router.post('/', validate(ReceiverValidation.receiveWebhook, {}, {}), async (req, res, next) => {
    try {
        const {
            id,
            callback_id,
            partner_id,
            merchant_id,
            merchant_account_number,
            customer_id,
            transaction_timestamp,
            amount,
        } = req.body;

        const result = await ReceiverService.notifyMerchant(
            id,
            callback_id,
            partner_id,
            merchant_id,
            merchant_account_number,
            customer_id
            transaction_timestamp,
            amount
        );

        res.json({ STATUS: `RECEIVE WEBHOOK`, code: res.statusCode, method: req.method, message: result });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
