const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config').jwtConfig
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken, checkUserToken } = require('../utils/auth')

const { check } = require('express-validator');


const validateUsername = [
    check('username', 'Please enter a username.')
    .exists({ checkFalsy: true })
]

const validateAuthFields = [
    check('username', 'Username must be between 5 and 50 characters long.')
    .isLength({ min: 5, max: 50 }),
    check('email', 'Enter a valid email address.')
    .exists({ checkFalsy: true })
    .isEmail(),
    check('password', 'Password must be 6 or more characters.')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 70 }),
    check('password2', 'Confirm password field must have the same value as the password field.')
    .exists({ checkFalsy: true })
    .custom((value, { req }) => value === req.body.password),
]

const validateUserInfoFields = [
    check('countryId', 'Please include a country.')
    .exists({ checkNull: true }),
    check('aboutYouId', 'Please include an about you.')
    .exists({ checkNull: true })
];


router.get('/', routeHandler(async(req, res) => {
    const users = await User.findAll();
    res.json({ users });
}))

//router.get('/', (req, res) => {//delete this route?
//check if token exists in cookies
//if so, check that it is a valid token
//jwt.decode(token) returns payload if valid
//take user id from payload and verify it exists
//if it exists, return true or something
// const user = await User.fin
//     res.send('from users router');
// })


router.post('/', validateUsername, validateAuthFields, validateUserInfoFields, handleValidationErrors, routeHandler(async(req, res, next) => {
    const { username, email, password, countryId, aboutYouId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword, countryId, aboutYouId });
    const token = await getUserToken(user);
    res.cookie('token', token, { maxAge: expiresIn * 1000 });
    res.json({ id: user.id, token });
}));

router.post('/token', validateUsername, handleValidationErrors, routeHandler(async(req, res, next) => { //for signing in
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { username },
                { email: username }
            ]
        }
    });
    if (!user || !user.validatePassword(password)) {
        const err = new Error('Invalid username/password combination');
        err.status = 401;
        err.title = 'Unauthorized';
        throw err;
    }
    const token = await getUserToken(user);
    res.cookie('token', token, { maxAge: expiresIn * 1000 });
    res.json({ id: user.id, token });
}));

router.post('/signinstate', routeHandler(async(req, res) => {
    const { cookies } = req.body;
    const tokens = cookies.split(';').filter(cookie => cookie.slice(0, 6) === 'token=').map(token => token.slice(6));
    const token = await checkUserToken(tokens);
    let signInState = false;
    if (token.length) signInState = true;
    res.json({ userSignedIn: signInState });
}))

//this route should destroy the token belonging to signed in user
router.get('/logout', routeHandler(async(req, res) => {
    res.clearCookie('token').end();
}));

router.post('/', (req, res, next) => { //for signing up

})


module.exports = router;