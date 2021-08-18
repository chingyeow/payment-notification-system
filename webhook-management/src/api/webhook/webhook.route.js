/* eslint-disable no-underscore-dangle */
const express = require('express');
const { validate } = require('express-validation');

const WebhookService = require('./webhook.service');
const WebhookValidation = require('./webhook.validation');

const router = express.Router();

/**
 * Persist webhook subscription in DB
 */
router.post('/', validate(WebhookValidation.createWebhook, {}, {}), async (req, res, next) => {
    try {
        const { url, name, merchantId, key } = req.body;

        const result = await WebhookService.createWebhook(url, name, merchantId, key);

        res.json({ STATUS: `SAVE WEBHOOK`, code: res.statusCode, method: req.method, message: result });
    } catch (error) {
        next(error);
    }
});

/**
 * Return an array of all the webhook subscription
 */
router.get('/', async (req, res, next) => {
    try {
        const result = await WebhookService.getWebhooks();

        res.json({ STATUS: `RETURN WEBHOOKS`, code: res.statusCode, method: req.method, message: result });
    } catch (error) {
        next(error);
    }
});

/**
 * Return an webhook by id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await WebhookService.getWebhookById(id);

        res.json({
            STATUS: `RETURN WEBHOOK BY ID`,
            code: res.statusCode,
            method: req.method,
            message: result || 'No Result Was Found',
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Return an webhook by merchant id
 */
router.get('/merchant/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await WebhookService.getWebhookByMerchantId(id);

        res.json({
            STATUS: `RETURN WEBHOOK BY MERCHANT ID`,
            code: res.statusCode,
            method: req.method,
            message: result || 'No Result Was Found',
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Update an webhook by id
 */
router.patch('/:id', validate(WebhookValidation.updateWebhook, {}, {}), async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await WebhookService.updateWebhookById(id, req.body);

        res.json({ STATUS: `RETURN WEBHOOK BY ID`, code: res.statusCode, method: req.method, message: result });
    } catch (error) {
        next(error);
    }
});

/**
 * Delete webhook by id
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await WebhookService.deleteWebhookById(id);

        res.json({ STATUS: `DELETE WEBHOOK`, code: res.statusCode, method: req.method, message: result });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
