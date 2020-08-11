const express = require('express');
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require('../utils');
const { Project } = require('../db/models');
const { check } = require('express-validator');

//I think we will need to add some validations (at least for post requests, for sure) and some error handling. Error handling may be taken care of by global error handler - not sure.

//what routes will we have in here?

//CREATE
// /projects/create -- this route leads to project creation page (leads to new project form)
// /projects/edit/publish/:projectId -- this route adds a newly created project to our database (on 'submit' of new project form)

//READ

// /projects/ this is the projects homepage - we will display a limited number of various different projects, maybe sorted by popularity or views or whatever
router.get('/', asyncHandler(async(req, res) => {
    const projectsArr = await Project.findAll({
        include: [], //eager loading - eventually we'll want user and comments and views and channel and all that shit to come with;
        limit: 25, //can be whatever - this is however many we want on a page. We could have this be a variable submitted by user so that can choose in a dropdown, for example, to see 10 projects per page, 25 per page, 50, 100, etc.
    }); //we have a generic error handler in app.js that should take care of most things. I think validations are more important for resource creating/updating/deleting
    res.render('projects-home-page', { projectsArr }); //something like this
}))

// /projects/id/:projectName -- I think projects/id should point to the desired project - I think adding :projectName is for user clarity. Basically based on project id we will know the exact project, and using that we grab the projectName and put it in url so user knows the name? This is a GET request for a specific project id
router.get('/:projectId(\\d+)', asyncHandler(async(req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    const project = await Project.findByPk(projectId, {
        include: [], //other bullshit for eager loading
    });
    res.render('project-view-page', { project, title: project.name }); //specify the title (in the tab) to be the project name
}))


//UPDATE
// /projects/edit/new -- I think this is closely tied to /projects/create route. The 'new' implies that a projectId does not yet exist because the project hasn't been published (i.e. added to database, at which point projectId is generated)


// /projects/:projectId/:projectName -- editing an existing project. Unsure about this - should projectId be aliased to a projectName instead, or should we provide both for clarity?

//this route simply gets the form in which users can edit their project.
router.get('/edit/:projectId(\\d+)', asyncHandler(async(req, res) => {
    const projectId = parstInt(req.params.projectId, 10);
    const project = awaitProject.findByPk(projectId, {
        include: [], //eager loading
    });
    res.render('project-edit-form', { project, title: `Edit ${project.name}` });
}))

//When users make edits and save them they are 'submitting the project-edit-form' - it is a post request to the same route.

//validations for editing a project -- these should be similar to the validations we implement on our database. We do them here as well so make sure the stuff we are sending to our database are properly submitted. Soon-Mi called this "sanitizing our database inputs"
// const checkProjectEdits = [
// 	check('bullshit')
// 	.yadda yadda
// ];

//I think since this is a post request we should have some validation things in here - using the check and validationHandler shit from the express-validator package or whatever.
router.post('/edit/:projectId(\\d+)', asyncHandler(async(req, res) => { //add checkProjectEdits and handleValidationErrors middleware
    //destructure body of requst to get the shit the users want to edit about the project
    const { destructuredShit } = req.body
    const project = await Project.update({ destructuredShit })
        //we'll have an error handler or something in case the project isn't updated correctly.
        //If project IS updated correctly, then we want to render the edit form once again but with the new project stuff.
        //We probably also want to save the previous version of the project somewhere in our database for history purposes, but maybe we worry about that later on.
    res.render('project-edit-form', { project });
}))


//DESTROY
// /projects/edit/deleted -- it is in project-readme that this is the route after project deletion. Maybe this is a confirmation page that project has been destroyed? If so, we can use the same page for each deletion (i.e. no specific project id or other identifying info). This will be the page we show upon successful Project.destroy(where: {id: projectId}) operation.

//we should have a button on the project edit page that allows a user to delete. If they click delete they should be sent to this route, and then redirected to a /projects/edit/deleted page to confirm successful deletion.
router.post('/edit/:projectId(\\d+)/delete', asyncHandler(async(req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    const deletedProjectName = await Project.findByPk(projectId).name;
    await Project.destroy(projectId);
    res.render('project-deleted-page', { deletedProjectName }) //we pass in the name to the project deleted page so we can say something like "Your Destructable 'How to build a backyard nuke' has been successfully destructed."
}))







module.exports = router;