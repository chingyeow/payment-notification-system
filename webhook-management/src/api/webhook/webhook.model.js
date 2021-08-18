const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        key: { type: String, required: true },
        name: { type: String, required: true },
        merchantId: { type: String, required: true },
        enabled: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('webhook', webhookSchema);
