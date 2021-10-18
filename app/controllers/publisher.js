async function publish(req, res) {
  return res.json({ message: 'OK', data: req.params });
}
module.exports = publish;
