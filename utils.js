const { validationResult } = require('express-validator');

const asyncHandler = (handler) => (req, res, next) => {
    handler(req, res, next).catch(next);
}

// const handleValidationErrors //add this bullshit



module.exports = { asyncHandler, }; //add handleValidationErrors
