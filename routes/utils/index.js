const { validationResult } = require('express-validator');

exports.routeHandler = (handler) => async(req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (err) {
        next(err);
    }
}

exports.handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    console.log('validationErrors---------------', validationErrors.array());
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);
        console.log(errors);
        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err)
    }
    next();
}