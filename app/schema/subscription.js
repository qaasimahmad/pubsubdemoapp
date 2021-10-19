const Joi = require('@hapi/joi');

exports.Subscription = Joi.object({

  url: Joi.string()
    .required()
});