const assert  = require('assert');
const isArray = require('lodash/isArray');

function getSubscriberUrls(subscriptionDetails){
  assert(isArray(subscriptionDetails), 'Array expected');
  return subscriptionDetails.length > 0 ? subscriptionDetails.map((item) => item.url)
    : [];
}
module.exports = getSubscriberUrls;
