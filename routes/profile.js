const express = require('express');
const parser = require('body-parser');
const url = require('url');
const request = require('request');
const qs = require('querystring');
const ntr = require('../models/nutrition');

const router = express.Router();
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
  if (req.session.user) {
    res.redirect(`/profile/${req.session.user.id}`);
  }
  res.render('profile', { title: 'nutrition', user: req.session.user });
});

router.get('/:id', (req, res, next) => {
  res.render('profile', { title: 'profile', user: req.session.user });
});

module.exports = router;
