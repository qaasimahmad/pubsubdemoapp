const express = require('express');

const route = express.Router();

const asyncHandler = require('express-async-handler');

const { subscriberAlpha, subscriberBeta } = require('../controllers/subscriber');

route.post('/alpha', asyncHandler((req, res) => subscriberAlpha(req, res)));

route.post('/beta', asyncHandler((req, res) => subscriberBeta(req, res)));

module.exports = route;
