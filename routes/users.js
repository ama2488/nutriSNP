const express = require('express');
const parser = require('body-parser');
const url = require('url');
const request = require('request');
const qs = require('querystring');
const users = require('../models/users');
const ntr = require('../models/nutrition');

const router = express.Router();
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

router.post('/signin', (req, res, next) => {
  users.authenticateUser(req.body.email, req.body.password, (err, user) => {
    if (err) {
      next(err);
    } else {
      req.session.user = user;
      res.redirect('/');
    }
  });
});

router.post('/signup', (req, res, next) => {
  users.createUser(req.body, (err, data) => {
    req.session.user = data[0];
    res.redirect('/');
  });
});

router.post('/signout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

// **********23ANDME OAUTH2************
const credentials = require('../config/creds');
const oauth2 = require('simple-oauth2').create(credentials);

const authorization_uri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/receive_code/',
  scope: 'basic names email genomes',
  state: 'jenvuece2a',
});

router.get('/auth', (req, res) => {
  res.redirect(authorization_uri);
});

router.get('/receive_code', (req, res) => {
  const code = req.query.code;
  if (!code) {
    res.send('Error!!');
  } else {
    console.log('running');

    oauth2.authorizationCode.getToken({
      code,
      redirect_uri: 'http://localhost:3000/receive_code/',
    }, saveToken);

    function saveToken(error, result) {
      if (error) {
        console.log('Access Token Error', error);
      } else {
        const token = oauth2.accessToken.create(result);
        const retToken = result.access_token;
        req.session.token = retToken;
        // console.log(req.session.token);
        request.get('https://api.23andme.com/3/account/', {
          auth: {
            bearer: retToken,
          },
        }, (err, response, body) => {
          const info = JSON.parse(body);
          const profile = info.data[0].profiles[0].id;
          req.session.user.ttam_profile_id = profile;
          users.updateUser(req.session.user.id, { ttam_profile_id: profile })
          .then(() => {
            res.redirect('/genome');
          });
        });
      }
    }
  }
});

router.get('/genome', (req, res, next) => {
  const profile = req.session.user.ttam_profile_id;
  request.get(`https://api.23andme.com/3/profile/${profile}/marker/rs4994`, {
    auth: {
      bearer: req.session.token,
    },
  }, (error, response, bod) => {
    const data = JSON.parse(bod);
    const variant = data.variants.map(a => (a.allele)).toString();
    users.updateSNPs({ user_id: req.session.user.id, snp_id: 1, variant })
    .catch((err) => { console.log(err); });
  });
  request.get(`https://api.23andme.com/3/profile/${profile}/marker/rs1042713`, {
    auth: {
      bearer: req.session.token,
    },
  }, (error, response, bod) => {
    const data = JSON.parse(bod);
    const variant = data.variants.map(a => (a.allele)).toString();
    users.updateSNPs({ user_id: req.session.user.id, snp_id: 2, variant })
    .catch((err) => { console.log(err); });
  });
  request.get(`https://api.23andme.com/3/profile/${profile}/marker/i6010053`, {
    auth: {
      bearer: req.session.token,
    },
  }, (error, response, bod) => {
    const data = JSON.parse(bod);
    const variant = data.variants.map(a => (a.allele)).toString();
    users.updateSNPs({ user_id: req.session.user.id, snp_id: 3, variant })
    .catch((err) => { console.log(err); });
  });
  request.get(`https://api.23andme.com/3/profile/${profile}/marker/rs1801282`, {
    auth: {
      bearer: req.session.token,
    },
  }, (error, response, bod) => {
    const data = JSON.parse(bod);
    const variant = data.variants.map(a => (a.allele)).toString();
    users.updateSNPs({ user_id: req.session.user.id, snp_id: 4, variant })
    .catch((err) => { console.log(err); });
  });
  request.get(`https://api.23andme.com/3/profile/${profile}/marker/rs1042714`, {
    auth: {
      bearer: req.session.token,
    },
  }, (error, response, bod) => {
    const data = JSON.parse(bod);
    const variant = data.variants.map(a => (a.allele)).toString();
    users.updateSNPs({ user_id: req.session.user.id, snp_id: 5, variant }).then(() => {
      res.redirect('/profile/');
    })
    .catch((err) => { console.log(err); });
  });
});

module.exports = router;
