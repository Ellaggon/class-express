const { isBoom } = require('@hapi/boom');
function logErrors(err, req, res, next){
  console.log(logErrors) // para ver cual se ejecuta primero
  console.error(err)
  next(err)
}

function handleError(err, req, res, next){
  console.log(handleError) // para ver cual se ejecuta primero
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}
function boomHandleError(err, req, res, next){
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

module.exports = {logErrors, handleError, boomHandleError}