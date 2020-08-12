const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils')

//consider adding account before signup, login, and logout so we can have a single route handler the those three routes.
//'account' routes------------------------------------------------
router.get('/signup', asyncHandler(async(req, res) => {
    res.render('signup');
}));

router.get('/login', asyncHandler(async(req, res) => {
    res.render('login');
}));

router.get('/logout', asyncHandler(async(req, res) => {
    res.render('logout');
}));

//member routes------------------------------------------------
router.get('/member/:userId', asyncHandler(async(req, res) => {
    res.render('user-page');
}));

//!!!STRETCH
router.get('/member/:id/settings', asyncHandler(async(req, res) => {
    res.render('user-settings-page');
}));

//projects routes------------------------------------------------
router.get('/projects', asyncHandler(async(req, res) => {
    res.render('projects-home-page');
}));

router.get('/projects/:id', asyncHandler(async(req, res) => {
    const projectId = parseInt(req.params.id, 10);
    res.render('project-view-page', { projectId });
}));


//all other routes------------------------------------------------
router.use((req, res) => {
    res.render('error-page');
});






module.exports = router;