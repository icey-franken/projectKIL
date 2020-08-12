const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils')
const { Country, AboutYou, Project, User } = require("../db/models")

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', asyncHandler(async(req, res) => {
    //!!!!!move these fetches to a public/js/signup.js file that will render these on the page.
    // Will have to make changes to signup.pug file as well.
    // const countries = await Country.findAll();
    // const aboutYous = await AboutYou.findAll();
    // console.log('countries', countries[0].id);
    // console.log('aboutYous', aboutYous[0]);
    // //
    res.render('signup')
}));


router.get('/projects', asyncHandler(async(req, res) => {
    // const projects = await Project.findAll({
    //     include: User
    // })
    res.render('projects-home-page');
}));

router.get('/projects/:id', asyncHandler(async(req, res) => {

    // const project = await fetch('/api/projects/:id');
    // console.log(project);
    // const project = await Project.findOne({
    //     where: {
    //         id: projectId
    //     },
    //     include: User
    // })
    // const projectId = parseInt(req.params.id, 10);
    const projectId = parseInt(req.params.id, 10);
    res.render('project-view-page', { projectId });
}));

router.use((req, res) => {
    res.render('error-page');
});
module.exports = router;