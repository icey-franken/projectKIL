const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.use((req, res) => {
    res.render('error-page');
})

module.exports = router;