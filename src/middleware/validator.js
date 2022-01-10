const { validationResult } = require('express-validator');

const { response } = require('../utils');

const validator = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
    return response.errorRes(res, 422, errors.array());
  }
  next();
};

module.exports = validator;
