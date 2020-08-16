const express = require('express');
const multer = require('multer')
const { Project } = require('../../db/models');

const { uploadFile, retrieveFile } = require('../utils/file-upload');
const { routeHandler, handleValidationErrors } = require('../utils');

const router = express.Router();
const app = express();
// configuring the DiscStorage engine.

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/', routeHandler(async (req, res) => {
    let allImages = [];
    const projects = await Project.findAll();
    for (let project of projects) {
        allImages.push(project.images)
    }
    res.json(allImages = [...allImages])
}));


router.get('/:file_name', async (req, res) => {
    await retrieveFile(req.params.file_name, res);
});

router.get('/project/:projectId(\\d+)', routeHandler(async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    const project = await Project.findByPk(projectId);
    const images = project.images;
    res.json({ images });
}));

router.post('/project/:projectId', upload.single('uploadedFile'), routeHandler(async function (req, res, next) {
    //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
    //req.file is the demo_file
    const projectId = parseInt(req.params.projectId, 10);
    const project = await Project.findByPk(projectId);
    const images = project.images;
    return await uploadFile(req.file.path, req.file.filename, res, images, projectId);
}));

module.exports = router;
