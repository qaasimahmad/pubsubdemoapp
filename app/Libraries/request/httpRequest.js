const axios = require('axios');

async function makePostRequest(url, payload = {}) {
  try {
    const response = await axios.post(url, payload);
    console.log(response.data);
    return response.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
}

async function makeGetRequest(url) {
  try {
    const resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
}
module.exports = { makePostRequest, makeGetRequest };
