async function subscriberAlpha(req, res) {
  console.log('AlphaBody', req.body);
  res.json(req.body);
}

async function subscriberBeta(req, res) {
  console.log('BetaBody', req.body);
  res.json(req.body);
}

module.exports = { subscriberAlpha, subscriberBeta };
