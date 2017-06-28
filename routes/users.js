const express = require('express');
const parser = require('body-parser');
const users = require('../models/users');
const Joi = require('joi');
const schema = require('../models/validate');

const router = express.Router();
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

router.post('/signin', (req, res, next) => {
  users.authenticateUser(req.body.email, req.body.password, (err, user) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      req.session.user = user;
      res.redirect('/');
    }
  });
});

router.post('/signup', (req, res, next) => {
  Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      res.status(400);
      res.send(err.message);
    } else {
      users.createUser(req.body, (err, data) => {
        req.session.user = data[0];
        res.redirect('/');
      });
    }
  });
});

router.post('/signout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
