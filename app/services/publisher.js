const assert               = require('assert');
const isArray              = require('lodash/isArray');
const esLib                = require('../Libraries/common/elasticsearch/esLib');
const getSubscriberUrls    = require('./lib/getSubsriberUrls');
const publishToSubscribers = require('./lib/publishToSubscribers');

async function publishMesageToSubscribers(topic, message){
  assert(topic, 'topic is required');
  assert(message, 'message is required');
  const searchParam         = { 'topic.keyword': topic };
  const subscriptionDetails = await esLib.findByParam(searchParam);
  const subscribersRequest  = {
    topic,
    data: {
      info: message
    }

  }

  if(subscriptionDetails){
    const subscriberUrls         = getSubscriberUrls(subscriptionDetails);
    const subscriberUrlsFiltered = subscriberUrls.filter(item => item != null);
    if(subscriberUrlsFiltered.length > 0){
      try{
        const publishedResults = await publishToSubscribers(subscriberUrlsFiltered, subscribersRequest);
        if(isArray(publishedResults) && publishedResults.length === 2){
          if(publishedResults[0].status === 'rejected' || publishedResults[1].status === 'rejected'){
            return {error: true, message: 'Publish Error!, unable to fulfil publish request to the subscriber'};
          } else {
            return {error: false, message: `Successfully Published to subscribers ${subscriberUrlsFiltered}`};
          }
        }
        return publishedResults;
      } catch(error){
        return error;
      }

    } else {
      return {
        error:   false,
        message: `Successfully Published to "null" subscribers. <No subscribers url associated with topic <${topic}>`
      };
    }
  } else {
    return {error: true, message: `No record with topic ${topic} found`};
  }
}

module.exports = publishMesageToSubscribers;
