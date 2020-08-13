const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../utils');
const { Comment, User, Project } = require('../../db/models');
const { check } = require('express-validator');

//I think we will need to add some validations (at least for post requests, for sure) and some error handling. Error handling may be taken care of by global error handler - not sure.

//what routes will we have in here?

//CREATE
// /projects/create -- this route leads to project creation page (leads to new project form)
// /projects/edit/publish/:projectId -- this route adds a newly created project to our database (on 'submit' of new project form)
const validateComment = check("comment").exists({ checkFalsy: true }).withMessage("Comment can't be empty.");

router.post(
    "/",
    validateComment,
    asyncHandler(async (req, res) => {
        const message = req.body.comment;
        const { projectId } = req.body;
        const comment = await Comment.create({ comment: message, projectId, userId: 1 });
        res.json({ comment });
    })
);
//READ
router.get('/', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll();
    res.json({ comments });
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findAll({
        where: {
            id
        }
    });
    res.json({ comment });
}))



router.get('/project/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comments = await Comment.findAll({
        include: [{ model: Project }],
        where: { projectId: id }
    });
    res.json({ comments });
}))

router.get('/user/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comments = await Comment.findAll({
        include: [{ model: User }],
        where: { userId: id },
        limit: 25,
    });
    res.json({ comments });
}))

//UPDATE
// /projects/edit/new -- I think this is closely tied to /projects/create route. The 'new' implies that a projectId does not yet exist because the project hasn't been published (i.e. added to database, at which point projectId is generated)


// /projects/:projectId/:projectName -- editing an existing project. Unsure about this - should projectId be aliased to a projectName instead, or should we provide both for clarity?

//this route simply gets the form in which users can edit their project.
router.patch('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const comment = await Comment.findAll({
        where: {
            id
        }
    });
    console.log(comment);
    if (comment) {
        await comment[0].update({ comment: req.body.updatedComment }, { where: id });
        res.json({ message: `Patched comment with id of ${req.params.id}.` });
    }
    else next();
}))


//DESTROY
// /projects/edit/deleted -- it is in project-readme that this is the route after project deletion. Maybe this is a confirmation page that project has been destroyed? If so, we can use the same page for each deletion (i.e. no specific project id or other identifying info). This will be the page we show upon successful Project.destroy(where: {id: projectId}) operation.

//we should have a button on the project edit page that allows a user to delete. If they click delete they should be sent to this route, and then redirected to a /projects/edit/deleted page to confirm successful deletion.
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const comment = await Comment.findAll({
        where: {
            id
        }
    });
    console.log(comment);
    if (comment) {
        await comment[0].destroy();
        res.json({ message: `Deleted comment with id of ${req.params.id}.` });
    }
    else next();
}))







module.exports = router;
