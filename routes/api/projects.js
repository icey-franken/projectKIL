const express = require('express');
const router = express.Router();
const { Project, User, Category, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config').jwtConfig
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken, checkUserToken } = require('../utils/auth')

//I think we will need to add some validations (at least for post requests, for sure) and some error handling. Error handling may be taken care of by global error handler - not sure.

const validateProjectCreation = [
    check('name', 'Please provide a name for you destruction.')
    .exists({ checkNull: true })
    .exists({ checkFalsy: true }),
    check('userId', 'Please sign in before destructing.')
    .exists({ checkNull: true })
    .exists({ checkFalsy: true }),
];


//CREATE
router.post('/new', validateProjectCreation, handleValidationErrors, routeHandler(async(req, res) => {
    const { name, userId } = req.body;
    const project = await Project.create({ name, userId });
    res.json({ project })
}))

//READ
//	read all projects
router.get('/', routeHandler(async(req, res) => {
    const projects = await Project.findAll({
        include: [{ model: User }, { model: Category }],
        limit: 25,
    });
    res.json({ projects });
}))

//	read single project
router.get('/:id(\\d+)', routeHandler(async(req, res) => {
    const projectId = parseInt(req.params.id, 10);
    const project = await Project.findByPk(projectId, {
        include: [{ model: User }, { model: Category }],
    });
    res.json({ project });
}))


//UPDATE
//	add validations that submitted info from project edit form is ok

//WILL PROBABLY ONLY WORK IF I CHANGE DATA MODEL TO HAVE SEP DESTRUCTION TABLE WITH HEADING AND DESCRIPTION FIELDS.
//this will update everything except arrays (destructions and desctruction headings).
// router.put('/edit/:projectId(\\d+)', routeHandler(async(req, res) => {
//     const projectId = parseInt(req.params.projectId, 10);
//     const { name, intro, supplies, destructions, destructionsHeadings } = req.body;
//     console.log(req.body);
//     if (destructions.length === destructionsHeadings.length && destructions.length === 0) {
//         try {
//             Project.update({
//                 name,
//                 intro,
//                 supplies,
//             }, {
//                 returning: true,
//                 where: { id: projectId },
//             }).then(([rowsUpdated, [project]]) => console.log('rowsUpdated', rowsUpdated, 'project', project));
//         } catch (e) { console.log(e) };
//     } else {
//         await Project.update({
//             name,
//             intro,
//             supplies,
//             destructions,
//             destructionsHeadings,
//         }, {
//             where: { id: projectId }
//         })
//     };
//     const project = await Project.findByPk(projectId);
//     res.json({ project });
// }));



//ARRAY PROBLEM WORKAROUND - this is ugly as shit... but it works.
router.put('/edit/:projectId(\\d+)', routeHandler(async(req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    const { name, intro, supplies, destructions, destructionsHeadings } = req.body;
    Project.findByPk(projectId).then((project) => {
        project.name = name;
        project.intro = intro;
        project.supplies = supplies;
        project.destructions = destructions;
        project.destructionsHeadings = destructionsHeadings;
        project.update({
            name: project.name,
            intro: project.intro,
            supplies: project.supplies,
            destructions: project.destructions,
            destructionsHeadings: project.destructionsHeadings,
        }, { where: { id: projectId } }).then(project => {
            console.log('line96', project);
            res.json({ project });
        })
    });
}));



//ADD STEP
router.get('/:projectId(\\d+)/addStep/', routeHandler(async(req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    const project = await Project.findByPk(projectId);
    const newDes = project.destructions;
    const newDesHead = project.destructionsHeadings;
    newDes.push('');
    newDesHead.push('');
    await Project.update({ destructions: newDes, destructionsHeadings: newDesHead }, { where: { id: projectId } });
    const newProject = await Project.findByPk(projectId)
    res.json({ project: newProject });
}));

//DELETE SINGLE STEP
router.delete('/:projectId(\\d+)/delete/step/:stepNum(\\d+)/', routeHandler(async(req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    const stepNum = parseInt(req.params.stepNum, 10);
    const project = await Project.findByPk(projectId);
    const newDes = project.destructions;
    const newDesHead = project.destructionsHeadings;
    newDes.splice(stepNum - 1, 1);
    newDesHead.splice(stepNum - 1, 1);
    await Project.update({ destructions: newDes, destructionsHeadings: newDesHead }, { where: { id: projectId } });
    const newProject = await Project.findByPk(projectId)
        //might be unnecessary to findByPk again, but it worksss
    res.json({ project: newProject });
}));

//DELETE ENTIRE PROJECT
router.delete('/:projectId(\\d+)/delete', routeHandler(async(req, res) => {
        const projectId = parseInt(req.params.projectId, 10);
        await Comment.destroy({ where: { projectId } });
        await Project.destroy({ where: { id: projectId } });
        // res.end();
        res.json({})
    }))
    //------------------------------------------
    //old


//When users make edits and save them they are 'submitting the project-edit-form' - it is a post request to the same route.

//validations for editing a project -- these should be similar to the validations we implement on our database. We do them here as well so make sure the stuff we are sending to our database are properly submitted. Soon-Mi called this "sanitizing our database inputs"
// const checkProjectEdits = [
// 	check('bullshit')
// 	.yadda yadda
// ];

//I think since this is a post request we should have some validation things in here - using the check and validationHandler shit from the express-validator package or whatever.
router.post('/edit/:projectId(\\d+)', routeHandler(async(req, res) => { //add checkProjectEdits and handleValidationErrors middleware
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








module.exports = router;