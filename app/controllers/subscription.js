const subscriptionService = require('../services/subscription');

async function subscribeToTopics(req, res){
  const {url}   = req.body || null;
  const {topic} = req.params;
  if(!topic) return res.status(422).json('topic is required as a path param');
  const subscriptionData   = {
    topic: topic,
    url
  };
  const subscriptionResult = await subscriptionService(subscriptionData);

  if(subscriptionResult) return res.status(200).json(subscriptionResult);
  return res.status(500).json(subscriptionResult);
}
module.exports = subscribeToTopics;
