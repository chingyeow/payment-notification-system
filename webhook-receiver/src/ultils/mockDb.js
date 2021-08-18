/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-unpublished-require */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = null;

module.exports = {
    dbConnect: async () => {
        mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();

        const mongooseOpts = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };

        await mongoose.connect(uri, mongooseOpts);
    },
    dbDisconnect: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    },
};
