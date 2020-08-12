const express = require('express');
const router = express.Router();
const { Country } = require('../../db/models');
const { asyncHandler } = require('../../utils');

router.get('/', asyncHandler(async(req, res) => {
    const countries = await Country.findAll();
    res.json({ countries })
}))

module.exports = router;