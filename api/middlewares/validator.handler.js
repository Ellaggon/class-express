const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // property representa de donde sacamos la info dinamicamente body, params, query
    const { error } = schema.validate(data, { abortEarly: false }); // validamos la data
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
