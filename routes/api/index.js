const express = require('express');
const router = express.Router();
const { environment } = require('../../config');
const { ValidationError } = require('sequelize');

const usersRouter = require('./users');
router.use('/users', usersRouter);
const projectsRouter = require('./projects');
router.use('/projects', projectsRouter);
const countriesRouter = require('./countries');
router.use('/countries', countriesRouter);
const aboutYousRouter = require('./aboutyous');
router.use('/aboutYous', aboutYousRouter);
const commentsRouter = require('./comments');
router.use('/comments', commentsRouter);

router.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map(e => e.message);
    };
    next(err);
});

//generic error handler - same as in app.js
router.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === 'production';
    if (!isProduction) console.log(err);
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

router.use('*', (req, res) => {
    res.status(404).json({ message: 'route does not exist' }).end();
});



module.exports = router;
