const express = require('express');
const parser = require('body-parser');
const url = require('url');
const request = require('request');
const qs = require('querystring');
const ntr = require('../models/nutrition');
const users = require('../models/users');

const router = express.Router();
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
  if (req.session.user) {
    res.redirect(`/profile/${req.session.user.id}`);
  } else {
    res.render('profile', { title: 'nutrition', user: req.session.user });
  }
});

router.get('/:id', (req, res, next) => {
  const user = parseInt(req.params.id, 10);
  ntr.getSNPs(user).then((variants) => {
    const phen = ntr.calcPhenotype(variants);
    const v = variants;
    console.log(phen);
    ntr.getUser(user).then((profile) => {
      const calories = ntr.calcCalories(profile);
      const userProfile = profile;
      ntr.getMacros(phen)
      .then((phenotype) => {
        const macros = ntr.calcMacros(calories, phenotype[0]);
        ntr.getActivities().then((activityLevels) => {
          res.render('profile', { title: 'profile',
            macros,
            profile: userProfile,
            user: req.session.user,
            calories,
            variants: v,
            activityLevels });
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
});

router.post('/:id', (req, res, next) => {
  const user = parseInt(req.params.id, 10);
  const data = req.body;
  users.updateUser(user, data)
  .then(() => {
    res.redirect('/profile');
  });
});

module.exports = router;
