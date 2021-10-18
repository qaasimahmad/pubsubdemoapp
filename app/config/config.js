const config = {
  appBaseUrl: process.env.APP_BASE_URL,
  subscriberPort: process.env.SUBSCRIBER_PORT,
  publisherPort: process.env.PUBLISHER_PORT,
  redisPort: process.env.REDIS_PORT,
  index: 'pubsubdemo',
  type: 'demo',
  elasticUrl: process.env.ELASTIC_URL,
};

module.exports = config;
