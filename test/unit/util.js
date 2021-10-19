/* eslint-disable no-undef */
const chai = require('chai');

const { expect }               = chai;
const buildUrl                 = require('../../app/Libraries/common/util/buildUrl');
const getRoute                 = require('../../app/Libraries/common/util/getRoute');
const { isValidSubscriberUrl } = require('../../app/Libraries/common/util/isValidSubscriberUrl');

describe('Pub Sub App', () => {
  const host       = 'http://localhost';
  const port       = 3000;
  const inValidUrl = 'http://localhost/gamma';
  const url        = ['http://localhost:2300/alpha'];
  const urls       = ['http://localhost:2300/alpha', 'http://localhost:2400/beta'];

  describe('build a new url based on the host and port passed', () => {
    it('should return a formatted url with host and port together', async() => {
      const expected = `${host}:${port}`;
      const result   = await buildUrl(host, port);

      expect(result).deep.equals(expected);
    });
  });

  describe('return a route from the url passed', () => {
    it('should return a single route if one url is passed', async() => {
      const expected = 'alpha';
      const result   = await getRoute(url);

      expect(result).equal(expected);
    });
  });

  describe('return a list routes from the urls passed', () => {
    it('should return a list of routes if multiple urls are passed', async() => {
      const expected = ['alpha', 'beta'];
      const result   = await getRoute(urls);

      expect(result).deep.equals(expected);
      expect(result).to.have.lengthOf(2);
    });
  });

  describe('determine if a url is contained in the default subscribers urls', () => {
    it('should return true if found', async() => {
      const expected = true;
      const result   = await isValidSubscriberUrl(url[0]);

      expect(result).equal(expected);
    });
    it('should return false if not found', async() => {
      const expected = false;
      const result   = await isValidSubscriberUrl(inValidUrl);

      expect(result).equal(expected);
    });
  });


});
