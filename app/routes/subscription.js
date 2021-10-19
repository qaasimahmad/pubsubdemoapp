const express = require('express');

const route = express.Router();

const asyncHandler = require('express-async-handler');

const SubscriptionController = require('../controllers/subscription');

const validate = require('../middleware/validation');

const { Subscription } = require('../schema/subscription');

route.post('/:topic', validate(Subscription), asyncHandler((req, res) => SubscriptionController(req, res)));

module.exports = route;
