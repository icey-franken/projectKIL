const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils')
const { Country, AboutYou, Project, User } = require("../db/models")

router.get('/', (req, res) => {
    res.render('comments');
})

router.use((req, res) => {
    res.render('error-page');
});
module.exports = router;
