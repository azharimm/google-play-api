const express = require('express');
const gplay = require('google-play-scraper');
const path = require('path');
const qs = require('querystring');
const {json, errorJson} = require('../utils/response')

const router = express.Router();

router.get('/', (req, res) => {
    return json(res, {
        maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
        source: 'https://github.com/azharimm/hadits-api',
    })
})

module.exports = router;