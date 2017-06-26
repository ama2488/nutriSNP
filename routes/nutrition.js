const express = require('express');
const parser = require('body-parser');
const url = require('url');
const request = require('request');
const qs = require('querystring');
const ntr = require('../models/nutrition');

const router = express.Router();
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
  const macros = { carbs: 200, fat: 60, protein: 140 };
  if (req.session.user) {
    res.redirect(`/nutrition/${req.session.user.id}`);
  }
  res.render('nutrition', { title: 'nutrition', macros, user: req.session.user });
});

router.get('/:id', (req, res, next) => {
  const userID = parseInt(req.params.id, 10);
  ntr.getSNPs(userID).then((variants) => {
    const phen = ntr.calcPhenotype(variants);
    ntr.getUser(userID).then((user) => {
      const calories = ntr.calcCalories(user);
      ntr.getMacros(phen)
      .then((phenotype) => {
        const macros = ntr.calcMacros(calories, phenotype[0]);
        res.render('nutrition', { title: 'nutrition', macros, user: req.session.user });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
