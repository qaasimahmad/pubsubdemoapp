const assert = require('assert');

function getSubscriberUrls(subscriptionDetails) {
  assert(Array.isArray(subscriptionDetails), 'Array expected');
  return subscriptionDetails.length > 0 ? subscriptionDetails.map((item) => item.url)
    : [];
}
module.exports = getSubscriberUrls;
