const axios = require('axios');

async function makePostRequest(url, payload = {}){
  try{
    const response = await axios.post(url, payload);

    return response.data;
  } catch(err){
    return err;
  }
}

async function makeGetRequest(url){
  try{
    await axios.get(url);
  } catch(err){
    return err;
  }
}
module.exports = { makePostRequest, makeGetRequest };
