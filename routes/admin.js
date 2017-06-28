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

router.post('/phen', (req, res, next) => {
  if (!req.session.user.is_admin) {
    const error = new Error('Not authorized.');
    next(error);
  } else {
    const data = req.body;
    const id = parseInt(req.body.id, 10);
    delete data.id;
    users.updateItem(id, data, 'phenotype_ntr')
  .then(() => {
    res.status(201);
    res.redirect(`/profile/${req.session.user.id}`);
  }).catch((err) => {
    console.log(err);
  });
  }
});

router.post('/snp', (req, res, next) => {
  if (!req.session.user.is_admin) {
    const error = new Error('Not authorized.');
    next(error);
  } else {
    const data = { description: req.body.description };
    const id = parseInt(req.body.id, 10);
    users.updateItem(id, data, 'snps')
  .then(() => {
    res.status(201);
    res.redirect(`/profile/${req.session.user.id}`);
  }).catch((err) => {
    console.log(err);
  });
  }
});

router.delete('/snp/:id', (req, res, next) => {
  if (!req.session.user.is_admin) {
    const error = new Error('Not authorized.');
    next(error);
  } else {
    const id = parseInt(req.params.id, 10);
    users.deleteItem(id, 'snps')
  .then(() => {
    res.status(200);
    res.send('deleted!');
  }).catch((err) => {
    console.log(err);
  });
  }
});

router.post('/snp/add/', (req, res, next) => {
  if (!req.session.user.is_admin) {
    const error = new Error('Not authorized.');
    next(error);
  } else {
    const data = req.body;
    users.addSNP(data)
  .then(() => {
    res.status(201);
    res.redirect(`/profile/${req.session.user.id}`);
  }).catch((err) => {
    console.log(err);
  });
  }
});

module.exports = router;
