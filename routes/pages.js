const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils')
const { Country, AboutYou } = require("../db/models")
router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', asyncHandler(async(req, res) => {
    const countries = await Country.findAll();
    const aboutYous = await AboutYou.findAll();
    res.render('signup', { countries, aboutYous })
}));

router.get('/projects', (req, res) => {
    res.render('projects-home-page');
})

router.use((req, res) => {
    res.render('error-page');
});
module.exports = router;