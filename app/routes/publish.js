const express = require('express');

const route = express.Router();

const asyncHandler = require('express-async-handler');
const res = require('express/lib/response');

const PublishController = require('../controllers/publisher');

route.post('/:topic', asyncHandler((req, res) => PublishController(req, res)));

module.exports = route;
