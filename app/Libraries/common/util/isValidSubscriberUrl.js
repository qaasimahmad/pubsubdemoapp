const { appBaseUrl,
  subscriberPort,
  publisherPort
}              = require('../../../config/config');
const buildUrl = require('../util/buildUrl');

const subscriberUrlAplha  = `${buildUrl(appBaseUrl, publisherPort)}/alpha`;
const subscriberUrlBeta   = `${buildUrl(appBaseUrl, subscriberPort)}/beta`;
const validSubscriberUrls = [subscriberUrlAplha, subscriberUrlBeta];

function isValidSubscriberUrl(url){
  return validSubscriberUrls.includes(url);
}
module.exports = {isValidSubscriberUrl, validSubscriberUrls};