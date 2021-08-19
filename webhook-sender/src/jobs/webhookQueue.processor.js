const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const Logger = require('../ultils/logger');

module.exports = async (job) =>
    new Promise((resolve, reject) => {
        Logger.info(`Webhook sender job received`);

        job.progress(0);

        Logger.debug(`Received the following data: ${JSON.stringify(job.data)}`);

        const { id, merchantId, merchantAccount, customerId, timestamp, amount, key, callbackUrl } = job.data;

        const payload = {
            id: uuidv4(),
            payment_id: id,
            merchant_id: merchantId,
            merchant_account_number: merchantAccount,
            customer_id: customerId,
            amount,
            transaction_time: timestamp,
        };

        const hmac = crypto.createHmac('sha256', key).update(JSON.stringify(payload)).digest('base64');

        job.progress(50);

        axios({
            method: 'post',
            url: callbackUrl,
            data: payload,
            headers: { 'X-Call-Signature': hmac },
        }).then((response) => {
            job.progress(75);

            if (response.status === 200) {
                job.progress(100);

                resolve(200);
            } else {
                reject(new Error(`Webhook Queue failed due to not receiving status code 200 from merchant`));
            }
        });
    });
