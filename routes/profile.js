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
    res.redirect('/profile/1');
  }
});

router.get('/:id', (req, res, next) => {
  const user = parseInt(req.params.id, 10);
  if (user !== 1) {
    if (!req.session.user || req.session.user.id !== user) {
      const error = new Error('Not Authorized.');
      next(error);
    }
  }
  ntr.getSNPs(user).then((variants) => {
    const phen = ntr.calcPhenotype(variants);
    const v = variants;
    ntr.getUser(user).then((profile) => {
      const calories = ntr.calcCalories(profile);
      const userProfile = profile;
      ntr.getMacros(phen)
      .then((phenotype) => {
        const macros = ntr.calcMacros(calories, phenotype[0]);
        ntr.getMacros().then((allPhenotypes) => {
          const p = allPhenotypes;
          ntr.getAllSNPs().then((allSNPs) => {
            const s = allSNPs;
            ntr.getActivities().then((activityLevels) => {
              res.render('profile', { title: 'profile',
                macros,
                profile: userProfile,
                user: req.session.user,
                calories,
                variants: v,
                activityLevels,
                phenotype: phenotype[0],
                phenotypes: p,
                snps: s });
            });
          });
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
  users.updateItem(user, data, 'users')
  .then(() => {
    res.redirect('/profile');
  });
});

module.exports = router;
