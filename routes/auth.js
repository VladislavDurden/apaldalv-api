const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/login', function(req, res, next) {
  const userData = req.body;

  if(!userData) {
    console.log('Empty user data');
  }

  res.json(userData);
  res.send();
});

router.post('/register', function(req, res, next) {
  const userData = req.body;

  if(!userData) {
    console.log('Empty user data');
  }

  res.json(userData);
  res.send();
});

module.exports = router;
