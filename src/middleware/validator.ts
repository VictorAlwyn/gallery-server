const {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");

const { validate } = new Validator();

const validationErrorMiddleware = (
  error: any,
  request: any,
  response: any,
  next: any
) => {
  if (response.headersSent) {
    return next(error);
  }
  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }
  response.status(400).json({
    errors: error.validationErrors,
  });

  next();
};

export default {
  validate,
  validationErrorMiddleware,
};
