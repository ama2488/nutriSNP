const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const user = require('./models/users');
require('dotenv').config();

const index = require('./routes/index');
const users = require('./routes/users');
const ttam = require('./routes/ttam');
const profile = require('./routes/profile');
const admin = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ keys: ['dskjf0qi340oij2k3j93387dlk@#$', '@#$WFEW#$CFDSdsfdsdlkajhi'] }));

app.use('/', index);
app.use(users);
app.use(ttam);
app.use('/profile', profile);
app.use('/admin', admin);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((u, done) => {
  done(null, u);
});

passport.deserializeUser((obj, done) => {
  done(obj, null);
});


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' ? 'http://nutrisnp.herokuapp.com/auth/facebook/callback' : 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'name'],
},
(accessToken, refreshToken, prof, done) => {
  process.nextTick(() => done(null, prof));
}));


app.get('/auth/facebook',
    passport.authenticate('facebook'),
    (req, res) => {});
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/', scope: 'email' }),
    (req, res) => {
      user.createFbUser(req.user, (err, result) => {
        if (err) {
          console.log('error', err);
        } else {
          req.session.user = result;
          res.redirect('/profile');
        }
      });
    });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { user: req.session.user });
});

module.exports = app;
