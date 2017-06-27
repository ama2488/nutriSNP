const express = require('express');
const router = express.Router();
const ntr = require('../models/nutrition');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'SNP', user: req.session.user });
});

module.exports = router;
