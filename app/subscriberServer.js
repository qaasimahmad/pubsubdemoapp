const express = require('express');
const { subscriberPort } = require('./config/config');
const subscriberRoute = require('./routes/subscribers');
const logger = require('./Libraries/common/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', subscriberRoute);

app.listen(subscriberPort);

logger.info(`Subscriber(s) listening on port ${subscriberPort}`);
