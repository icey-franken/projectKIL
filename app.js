const express = require("express");
const { environment } = require('./config');
const app = express();

app.set('view engine', 'pug');
app.use(require('morgan')("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
//remember to use csrfProtection as middleware on individual routes as needed!
const csrfProtection = require('csurf')({ cookie: true });
//serving up static assets from the public directory

const apiRouter = require('./routes/api');
const pagesRouter = require('./routes/pages');
app.use('/public', express.static('public'));
app.use('/api', apiRouter);
app.use('/', pagesRouter);

//following two lines may be unnecessary
// const projectsRouter = require('./routes/projects');
// app.use('/projects', projectsRouter);


// app.get("/", (req, res) => {
//     res.send("Welcome to the express-sequelize-starter!");
// });

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    // req.setTimeout(1000);
    // res.setTimeout(1000);
    // res.render('error-page');

    //the following was from the express-sequelize-starter directory
    const err = new Error("The requested resource couldn't be found.");
    err.status = 404;
    next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        stack: isProduction ? null : err.stack,
    });
});



module.exports = app;