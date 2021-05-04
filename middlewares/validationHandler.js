const { validationResult } = require("express-validator");

function checkValidation(req, res, next) {
  const result = {};
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    // for (var i = 0; i < errors.array().length; i++) {
    //   result[errors.array()[i].param] = errors.array()[i].msg;
    errors.array().forEach((error) => {
      result[error.param] = error.msg;
    });
    return res.json({ status: "fail", data: result });
  }
}

module.exports = checkValidation;
