const mongoose = require('mongoose');

const failedJobsSchema = new mongoose.Schema(
    {
        jobId: { type: String, required: true },
    },
    { timestamps: true }
);

const webhookSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        key: { type: String, required: true },
        name: { type: String, required: true },
        merchantId: { type: String, required: true },
        enabled: { type: Boolean, default: false },
        failedJobs: [failedJobsSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model('webhook', webhookSchema);
