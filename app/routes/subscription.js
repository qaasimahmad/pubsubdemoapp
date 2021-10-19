const express = require('express');

const route = express.Router();

const asyncHandler = require('express-async-handler');

const SubscriptionController = require('../controllers/subscription');


route.post('/:topic', asyncHandler((req, res) => SubscriptionController(req, res)));

module.exports = route;
