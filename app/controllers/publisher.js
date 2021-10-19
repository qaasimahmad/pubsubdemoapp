const publishMessageToSubscribers = require('../services/publisher');

async function publish(req, res){
  const {message} = req.body;
  const {topic}   = req.params;
  if(!message) return res.status(422).json('message is required');
  const publisherResult = await publishMessageToSubscribers(topic, message);

  if(publisherResult.error === true){
    return res.status(400).json(publisherResult);
  }
  return res.status(200).json(publisherResult);
}
module.exports = publish;
