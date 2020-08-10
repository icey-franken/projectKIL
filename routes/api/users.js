const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');

router.get('/', (req, res) => {
    res.send('from users router');
})

router.post('/token', (req, res, next) => { //for signing in
    res.json({ message: 'test' });
})

router.post('/', (req, res, next) => { //for signing up

})


module.exports = router;