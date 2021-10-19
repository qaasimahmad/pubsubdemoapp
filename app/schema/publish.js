const Joi = require('@hapi/joi');

exports.Publish = Joi.object({

  message: Joi.string()
    .required(),

});