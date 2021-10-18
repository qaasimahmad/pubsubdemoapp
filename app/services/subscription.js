const assert = require('assert');
const esLib = require('../Libraries/common/elasticsearch/esLib');

async function saveSubscriptionDetails(subscriptionDetails) {
  assert(subscriptionDetails, 'subscriptionData cannot be empty');
  const { url, topic } = subscriptionDetails;
  const result = await esLib.saveDoc(subscriptionDetails);
  if (result === 1) {
    return {
      url: url || null,
      topic: topic || null,
    };
  }
  return null;
}
module.exports = saveSubscriptionDetails;
