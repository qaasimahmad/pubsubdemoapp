const logger = require('../Libraries/common/logger');

async function subscriberAlpha(req, res){
  logger.info(`Great! subscriber Alpha received ${req.body} from publisher`);
  return res.status(200).json({error: false, response: req.body});
}

async function subscriberBeta(req, res){
  logger.info(`Great! subscriber Beta received ${req.body} from publisher`);
  return res.status(200).json({error: false, response: req.body});
}

module.exports = { subscriberAlpha, subscriberBeta };
