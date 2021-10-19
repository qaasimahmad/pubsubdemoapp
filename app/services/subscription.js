const assert                                      = require('assert');
const esLib                                       = require('../Libraries/common/elasticsearch/esLib');
const {isValidSubscriberUrl, validSubscriberUrls} = require('../Libraries/common/util/isValidSubscriberUrl');

async function saveSubscriptionDetails(subscriptionDetails){
  assert(subscriptionDetails, 'subscriptionData cannot be empty');
  const { url, topic } = subscriptionDetails;

  if(url && !isValidSubscriberUrl(url)) return {error: true, message: `please use these available subscriber urls \n ${validSubscriberUrls}`}; //eslint-disable-line max-len
  const savedResult         = await esLib.indexDoc(subscriptionDetails);
  if(savedResult.result){
    return {error:   false, message: `subscription to topic <${topic}> successful`, data:    {
      url:   url || null,
      topic: topic || null,
    }};
  }
  return {error: true, message: `failed to subscribe to topic <${topic}>`, data: {}};
}
module.exports = saveSubscriptionDetails;
