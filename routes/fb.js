const express = require('express');
const users = require('../models/users');
const passport = require('passport');

const router = express.Router();

router.get('/auth/facebook',
    passport.authenticate('facebook'),
    (req, res) => {});

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/', scope: 'email' }),
    (req, res) => {
      users.createFbUser(req.user, (err, result) => {
        if (err) {
          console.log('error', err);
        } else {
          req.session.user = result[0];
          res.redirect('/profile');
        }
      });
    });

module.exports = router;
