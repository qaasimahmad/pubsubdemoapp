const assert = require('assert');
const esLib = require('../Libraries/common/elasticsearch/esLib');
// const logger = require('../Libraries/common/logger');
const getSubscriberUrls = require('./lib/getSubsriberUrls');
const publishToSubscribers = require('./lib/publishToSubscribers');
const { indexDoc } = require('../Libraries/common/elasticsearch/esLib');

async function publishMesageToSubscribers(topic, message) {
  console.log('Message Passed', message);
  assert(topic, 'topic is required');
  assert(message, 'message is required');
  const searchParam = { 'topic.keyword': topic };
  const subscriptionDetails = await esLib.findByParam(searchParam);
  console.log('isExits >>', subscriptionDetails);

  if (subscriptionDetails) {
    const subscriberUrls = getSubscriberUrls(subscriptionDetails);
    if (subscriberUrls.length > 0) {
      const publishedResults = await publishToSubscribers(subscriberUrls, message);
      console.log('OnPublished ::', publishedResults);
      return publishedResults;
    }
  } else {
    // TODO: If no subscriberUrl, just save the topic in the Db with subscriber url as null
    const item = {
      topic,
      url: null,
    };
    const indexedResponse = await indexDoc(topic, item);
    if (indexedResponse.result) {
      return console.log('No_Sub_Url Found, but never mind, we have your topic :)');
    }
  }
}
/*
- get the topic
- check if topic exists-YES-fetch all urls associated with it.
- make http call(s) to the url(s);
- else just save the topic in the Db with subscriber url as null
*/

module.exports = publishMesageToSubscribers;
