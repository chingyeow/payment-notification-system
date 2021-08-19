# Payment Notification System

This repository demonstrate the MVP of a payment notification system. It enables merchants to be notified when payment partners complete a transaction. The system is composed of 3 microservices and 1 ui component that monitor the queue, all contain in a monorepo.

## Tech

- [Node v14+](http://nodejs.org/)
- [MongoDb](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Docker-Compose](https://www.docker.com/)
- [Express](https://npmjs.com/package/express)
- [Winston](https://www.npmjs.com/package/winston)
- [Bull](https://www.npmjs.com/package/bull)
- [Bull-Board](https://www.npmjs.com/package/@mattoakes/bull-board)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Chai](https://www.npmjs.com/package/chai)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Joi](https://www.npmjs.com/package/joi)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Config](https://www.npmjs.com/package/config)

## How to run?

1. [Install Docker Compose](https://docs.docker.com/compose/install/)
2. Clone this repository
3. Ensure .env is provision in each folder. Refer to .env.example for sample
4. Run all containers with `docker-compose up`
5. Launch browser and enter `http://localhost:3000/ui` to monitor queue
6. Refer to the next section for the typical flow
7. Use `https://webhook.site/` as a webhook receiver to monitor messages coming in

## Typical Flow

1. Subscribe to webhook: POST http://localhost:8080/api/webhook
2. Payment partner send to webhook-receiver service: POST http://localhost:8081/api/callback
3. webhook-receiver service retrieve merchant callback url and shared secret key by requesting from webhook-management service, and add consolidated payload to job queue
4. webhook-sender service picks up the job from job queue, generate HMAC token from shared secret key, and send the consolidated payload to merchant
5. Merchant should return status code 200 to acknowledge that the notification had been received by them
6. If system don't receive acknowledgement from merchant, it will retry for 6 times with a exponential backoff configured
7. If retry attempt is zero, job id will be added to the database to enable manual retry for the merchant


