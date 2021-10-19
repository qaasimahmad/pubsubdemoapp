/* eslint-disable no-undef */
const chai = require('chai');

const { expect } = chai;
const buildUrl   = require('../../app/Libraries/common/util/buildUrl');

describe('Pub Sub App', () => {
  const host = 'http://localhost';
  const port = 3000;

  describe('build a new url based on the host and port passed', () => {
    it('should return a formatted url with host and port together', async() => {
      const expected = `${host}:${port}`;
      const result   = await buildUrl(host, port);

      expect(result).deep.equals(expected);
    });
  });
});
