const express = require('express');
const parser = require('body-parser');
const request = require('request');
const users = require('../models/users');

const router = express.Router();
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

const callback = process.env.NODE_ENV === 'production' ? 'https://nutrisnp.herokuapp.com/receive_code/' : 'http://localhost:3000/receive_code/';
// **********23ANDME OAUTH2************
const credentials = {
  client: {
    id: '1e740220bb911b3b2b0788ac89fe366c',
    secret: process.env.TTAM_SECRET,
  },
  auth: {
    tokenHost: 'https://api.23andme.com',
    tokenPath: '/token',
    authorizePath: '/authorize',
  },
};
const oauth2 = require('simple-oauth2').create(credentials);

const authorization_uri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: callback,
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
      redirect_uri: callback,
    }, saveToken);

    function saveToken(error, result) {
      if (error) {
        console.log('Access Token Error', error);
      } else {
        const token = oauth2.accessToken.create(result);
        req.session.token = result.access_token;
        // console.log(req.session.token);
        request.get('https://api.23andme.com/3/account/', {
          auth: {
            bearer: req.session.token,
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
  const token = req.session.token;
  function getTTAM(profileID, userToken, snpID, snpName) {
    request.get(`https://api.23andme.com/3/profile/${profile}/marker/${snpName}`, {
      auth: {
        bearer: token,
      },
    }, (error, response, bod) => {
      const data = JSON.parse(bod);
      const variant = data.variants.map(a => (a.allele)).toString();
      users.updateSNPs({ user_id: req.session.user.id, snp_id: snpID, variant })
      .catch((err) => {
        console.log(err);
      });
    });
  }
  getTTAM(profile, token, 1, 'rs4994');
  getTTAM(profile, token, 2, 'rs1042713');
  getTTAM(profile, token, 3, 'i6010053');
  getTTAM(profile, token, 4, 'rs1801282');
  getTTAM(profile, token, 5, 'rs1042714');

  res.redirect('/profile/');
});

module.exports = router;
