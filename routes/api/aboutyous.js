const express = require('express');
const router = express.Router();
const { AboutYou } = require('../../db/models');
const { asyncHandler } = require('../../utils');

router.get('/', asyncHandler(async(req, res) => {
    const aboutYous = await AboutYou.findAll();
    res.json({ aboutYous })
}))

module.exports = router;