/* eslint-disable no-undef*/
const { deleteIndex, indexDoc, createIndex } = require('../../app/Libraries/common/elasticsearch/esLib');
const chai                                   = require('chai');

const { expect }                            = chai;
const publishMesageToSubscribers            = require('../../app/services/publisher');
const buildUrl                              = require('../../app/Libraries/common/util/buildUrl');
const { appBaseUrl, subscriberPort, index } = require('../../app/config/config');

beforeEach(async() => {
  await deleteIndex(index);
});

after(async() => {
  await createIndex(index);
});

describe('Pub Sub App', () => {
  const topic1                = 'topic1';
  const topic2                = 'topic2';
  const topicDefault          = 'topicDefault';
  const topic3                = 'topic3';
  const topic4                = 'topic4';
  const subscriberUrl1        = `${buildUrl(appBaseUrl, subscriberPort)}/alpha`;
  const subscriberUrl2Valid   = `${buildUrl(appBaseUrl, subscriberPort)}/beta`;
  const subscriberUrl2inValid = `${buildUrl(appBaseUrl, subscriberPort)}/betas`;

  const subscriptionDataDefault = {
    topic: topicDefault,
    url:   subscriberUrl1
  }
  const subscriptionData1       = {
    topic: topic1,
    url:   subscriberUrl1
  };

  const subscriptionData2 = {
    topic: topic1,
    url:   subscriberUrl2Valid,
  };

  const subscriptionData3Valid = {
    topic: topic2,
    url:   subscriberUrl2Valid
  };

  const subscriptionData3inValid = {
    topic: topic3,
    url:   subscriberUrl2inValid
  };

  const subscriptionDataNullUrl = {
    topic: topic4,
    url:   null
  }

  describe('save new topic and generated subscriber url', () => {
    it('should return an object on successful subscription', async() => {
      const savedResult   = await indexDoc(subscriptionDataDefault);
      if(savedResult.result){

        expect(savedResult).to.haveOwnProperty('result');
      }
    });
  });

  describe('publish message to a subscriber per topic', () => {
    const message = 'Hello publisher';
    const {url}   = subscriptionData3Valid;

    it('should return result on publish', async() => {
      const savedResult = await indexDoc(subscriptionData3Valid);
      if(savedResult.result){
        const result   = await publishMesageToSubscribers(topic2, message);
        const expected = {error: false, message: `Successfully Published to subscriber ${url}`};

        expect(result).to.deep.equal(expected);
      }
    });

    it('should return error if an error exists', async() => {
      const savedResult = await indexDoc(subscriptionData3inValid);
      const {url}       = subscriptionData3inValid;
      if(savedResult.result){
        const result   = await publishMesageToSubscribers(topic3, message);
        const expected = {error: true, message: `Publish Error!, Failed to publish to subscriber ${url}`};

        expect(result).to.deep.equal(expected);
      }
    });

    it('should publish publish even without a subscriberUrl', async() => {
      const savedResult = await indexDoc(subscriptionDataNullUrl);
      if(savedResult.result){
        const result   = await publishMesageToSubscribers(topic4, message);
        const expected = {
          error:   false,
          message: `Successfully Published to "null" subscribers. <No subscribers url associated with topic <${topic4}>`
        };

        expect(result).to.deep.equal(expected);
      }
    });
  });

  describe('publish message to multiple subscribers per topic', () => {
    const message = 'Hello publisher';
    const url1    = subscriptionData1.url;
    const url2    =  subscriptionData2.url;

    it('should return result on publish', async() => {
      const savedResult1 = await indexDoc(subscriptionData1);
      if(savedResult1.result){
        const savedResult2 = await indexDoc(subscriptionData2);
        if(savedResult2.result){
          const result   = await publishMesageToSubscribers(topic1, message);
          const expected = {error: false, message: `Successfully Published to subscribers ${[url1, url2]}`};

          expect(result).to.deep.equal(expected);
        }
      }
    });
  });

});