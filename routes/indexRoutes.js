const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
    res.render('index/about');
})

router.get('/shop', (req, res) => {
    res.render('index/shop');
})

module.exports = router;