const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const Queue = require('bull');

const config = require('./config/index');

const WebhookQueue = new Queue('webhookQueue', config.redis.url);

const express = require('express');

const run = async () => {
    const app = express();

    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/ui');

    createBullBoard({
        queues: [new BullAdapter(WebhookQueue)],
        serverAdapter,
    });

    app.use('/ui', serverAdapter.getRouter());

    app.listen(3000, () => {
        console.log('Running on 3000...');
        console.log('For the UI, open http://localhost:3000/ui');
    });
};

// eslint-disable-next-line no-console
run().catch((e) => console.error(e));
