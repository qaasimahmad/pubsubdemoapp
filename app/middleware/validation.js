/* eslint-disable consistent-return */
module.exports = (Schema) => (req, _res, next) => {
  try{
    const options   = { abortEarly: false };
    const { error } = Schema.validate(req.body, options);
    if(!error) return next();
    const err      = new Error('Validation Error.');

    err.info       = error.details.map((errorObject) => errorObject.message);
    err.statusCode = 422;
    next(err);
  } catch(error){
    next(error);
  }
};