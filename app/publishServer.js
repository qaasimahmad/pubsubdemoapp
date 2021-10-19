const express           = require('express');
const { publisherPort } = require('./config/config');

require('dotenv').config();
const publishRoute      = require('./routes/publish');
const subscriptionRoute = require('./routes/subscription');
const logger            = require('./Libraries/common/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/publish', publishRoute);

app.use('/subscribe', subscriptionRoute);

app.listen(publisherPort);

logger.info(`Publisher is listening on port ${publisherPort}`);
