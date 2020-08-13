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

router.get('/projects/:projectId', asyncHandler(async(req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    res.render('project-view-page', { projectId });
}));

router.get('/editDestructable/new/', asyncHandler(async(req, res) => {
    res.render('project-new-form')
}))

router.get('/editDestructable/:projectId/', asyncHandler(async(req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    res.render('project-edit-form', { projectId })
}))

//all other routes------------------------------------------------
router.use((req, res) => {
    res.render('error-page');
});






module.exports = router;
