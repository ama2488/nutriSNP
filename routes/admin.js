const express = require('express');
const parser = require('body-parser');
const url = require('url');
const request = require('request');
const qs = require('querystring');
const users = require('../models/users');

const router = express.Router();
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

router.post('/admin/snp', (req, res, next) => {
  if (!req.session.user.is_admin) {
    const error = new Error('Not authorized.');
    next(error);
  } else {
    const data = { description: req.body.description };
    const id = parseInt(req.body.id, 10);
    users.updateLinks(id, data)
  .then(() => {
    res.status(201);
    res.redirect(`/profile/${req.session.user.id}`);
  }).catch((err) => {
    console.log(err);
  });
  }
});

module.exports = router;
