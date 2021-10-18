const chai = require('chai');
const { deleteIndex, indexDoc } = require('../../app/Libraries/common/elasticsearch/esLib');

const { expect } = chai;
const saveSubscriptionDetails = require('../../app/services/subscription');
const publishMesageToSubscribers = require('../../app/services/publisher');
const buildUrl = require('../../app/Libraries/common/util/buildUrl');
const { appBaseUrl, subscriberPort, index } = require('../../app/config/config');

before(async () => {
  await deleteIndex(index);
});

describe('Pub Sub App', () => {
  const topic = 'topic1';
  const subscriberUrl1 = `${buildUrl(appBaseUrl, subscriberPort)}/alpha`;
  const subscriberUrl2 = `${buildUrl(appBaseUrl, subscriberPort)}/beta`;
  const subscriptionData1 = {
    topic,
    url: subscriberUrl1,
  };

  const subscriptionData2 = {
    topic,
    url: subscriberUrl2,
  };

  describe('save new topic and generated subscriber url', () => {
    it('should return an object on successful subscription', async () => {
      const result = await saveSubscriptionDetails(subscriptionData2);
      const expected = {
        url: subscriberUrl2,
        topic,
      };
      expect(result).deep.equals(expected);
    });
  });

  // describe('publish message to a subscriber per topic', () => {
  //   const message = 'Hello subscriber';
  //   it('should return result on publish', async () => {
  //     const savedResult = await indexDoc(topic, subscriptionData1);
  //     console.log('SavedResult >>', savedResult);
  //     if(savedResult.result){
  //       const result = await publishMesageToSubscribers(topic, message);
  //       console.log('TestResult ::', result);
  //       const expected = {message};
  //       expect(result).to.deep.equal(expected);
  //     }
  //   }).timeout(5000);
  // });

  describe('publish message to multiple subscribers per topic', () => {
    const message = 'Hello subscribers';
    it('should return result on publish', async () => {
      const savedResult1 = await indexDoc(topic, subscriptionData1);
      if (savedResult1.result) {
        const result = await publishMesageToSubscribers(topic, message);
        console.log('TestResult ::', result);
        const expected = { message };
        expect(result).to.deep.equal(expected);
      }
    }).timeout(5000);
  });
});
