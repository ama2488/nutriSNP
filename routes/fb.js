// const express = require('express');
// const users = require('../models/users');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
//
// const router = express.Router();
//
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
//
// passport.deserializeUser((obj, done) => {
//   done(obj, null);
// });
//
//
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: 'http://localhost:3000/auth/facebook/callback',
//   profileFields: ['id', 'displayName', 'email'],
// },
// (accessToken, refreshToken, prof, done) => {
//   process.nextTick(() => done(null, prof));
// }));
//
// router.get('/auth/facebook',
//     passport.authenticate('facebook'),
//     (req, res) => {});
// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/' }),
//     (req, res) => {
//       users.createFbUser(req.user, (err, user) => {
//         if (err) {
//           console.log('error', err);
//         } else {
//           req.session.user = user;
//         }
//       });
//       res.redirect('/profile');
//     });
//
// module.exports = router;
