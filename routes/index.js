const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'SNP', user: req.session.user });
});

router.post('/login', (req, res, next) => {
  const data = req.body;
  console.log(data);
});

module.exports = router;
