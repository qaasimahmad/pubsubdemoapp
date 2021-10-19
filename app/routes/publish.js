const express = require('express');

const route = express.Router();

const asyncHandler = require('express-async-handler');

const validate = require('../middleware/validation');

const { Publish } = require('../schema/publish');

const PublishController = require('../controllers/publisher');

route.post('/:topic', validate(Publish), asyncHandler((req, res) => PublishController(req, res)));

module.exports = route;
