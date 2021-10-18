/* eslint-disable consistent-return */
const assert = require('assert');
const getRoute = require('../../Libraries/common/util/getRoute');
const { makePostRequest } = require('../../Libraries/request/httpRequest');
const logger = require('../../Libraries/common/logger');

async function publishToSubscribers(urls, message) {
  assert(Array.isArray(urls), 'expecting an array');
  const urlsLength = urls.length;

  switch (urlsLength) {
    case 1:
      const route = getRoute(urls) === 'alpha' ? 'alpha' : 'beta';
      if (route === 'alpha') {
        try {
          const response = await publishToSubscriberAlpha(urls[0], { message });// eslint-disable-line no-use-before-define
          return response;
        } catch (error) {
          return error;
        }
      } else {
        const response = await publishToSubscriberBeta(urls[0]); // eslint-disable-line no-use-before-define
        return response;
      }

    case 2:
      const urlAlpha = urls.find((item) => item.includes('alpha'));
      const urlBeta = urls.find((item) => item.includes('beta'));
      console.log(`Two Urls Passed are ${urlAlpha}=>${urlBeta}`);
      await publishToSubscriberAlpha(urlAlpha, { message });
      await publishToSubscriberBeta(urlBeta, { message });

    default:
      logger.info('Oops! this case is not handled.');
  }
  try {
    const [alphaSubscriberResponse, betaSubscriberResponse] = await Promise.allSettled([publishToSubscriberAlpha, publishToSubscriberBeta]); // eslint-disable-line no-use-before-define
    console.log(`${JSON.stringify(alphaSubscriberResponse)}==>${JSON.stringify(betaSubscriberResponse)}`);
  } catch (error) {
    console.error(error);
  }
}

async function publishToSubscriberAlpha(url, message) {
  assert(url, 'url must be passed');
  assert(message, 'message must be passed');
  const response = await makePostRequest(url, message);
  console.log('AlphaFunction', response);
  return response;
}

async function publishToSubscriberBeta(url, message) {
  assert(url, 'url must be passed');
  assert(message, 'message must be passed');
  const response = await makePostRequest(url, message);
  console.log('BetaFunction', response);
  return response;
}

module.exports = publishToSubscribers;
