const express = require('express');
const users = require('../models/users');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(obj, null);
});


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
},
(accessToken, refreshToken, prof, done) => {
  return users.createUser({});
  process.nextTick(() => done(null, prof));
}));

router.get('/auth/facebook',
    passport.authenticate('facebook'),
    (req, res) => {});
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
      console.log(req.body);
      res.redirect('/profile');
    });

module.exports = router;
