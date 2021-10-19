/* eslint-disable consistent-return */
const assert              = require('assert');
const isArray             = require('lodash/isArray');
const getRoute            = require('../../Libraries/common/util/getRoute');
const { makePostRequest } = require('../../Libraries/request/httpRequest');
const logger              = require('../../Libraries/common/logger');

async function publishToSubscribers(urls, subscribersRequest){
  assert(isArray(urls), 'expecting an array');
  const urlsLength = urls.length;
  const route      = getRoute(urls) === 'alpha' ? 'alpha' : 'beta';
  const urlAlpha   = urls.find((item) => item.includes('alpha'));
  const urlBeta    = urls.find((item) => item.includes('beta'));

  switch(urlsLength){
  case 1:
    if(route === 'alpha'){
      const response = await publishToSubscriberAlpha(urls[0], subscribersRequest);

      return response;
    } else {
      const response = await publishToSubscriberBeta(urls[0], subscribersRequest);

      return response;
    }

  case 2:
    try{
      return await Promise.allSettled(
        [
          publishToSubscriberAlpha(urlAlpha, subscribersRequest),
          publishToSubscriberBeta(urlBeta, subscribersRequest)
        ]);
    } catch(error){
      logger.error('Error On Making Dual Calls >>', error);
    }
    break;

  default:
    logger.info('Oops! this case is not handled.');

  }

}

async function publishToSubscriberAlpha(url, subscribersRequest){
  assert(url, 'url must be passed');
  assert(subscribersRequest, 'message must be passed');
  const response = await makePostRequest(url, subscribersRequest);
  if(response.error === false){
    return {error: false, message: `Successfully Published to subscriber ${url}`};
  }
  return {error: true, message: `Publish Error!, Failed to publish to subscriber ${url}`};
}

async function publishToSubscriberBeta(url, subscribersRequest){
  assert(url, 'url must be passed');
  assert(subscribersRequest, 'message must be passed');
  const response = await makePostRequest(url, subscribersRequest);
  if(response.error === false){
    return {error: false, message: `Successfully Published to subscriber ${url}`};
  }
  return {error: true, message: `Publish Error!, Failed to publish to subscriber ${url}`};
}

module.exports = publishToSubscribers;
