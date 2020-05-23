const express = require('express');
const router = express.Router();
const moment = require('moment');

const User = require('../models/user');

const mongoose = require('mongoose');
const uri = `mongodb+srv://admin:wbMuYre6@cluster0-1qm9j.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true`;

router.post('/login', async (req, res) => {
  const userData = req.body;

  if(!userData) {
    console.log('Empty user data');
  }

  res.json(userData);
  res.send();
});

router.post('/register', async(req, res) => {
  const requestBody = req.body;

  if (!requestBody) {
    res.send('Empty user data!');
  }

  const userData = {
    email: requestBody.email,
    password: requestBody.password,
    createdDate: moment().format(),
    status: 'REGISTERED',
  };

  await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err) => {
      console.log('Error while connecting to DB:', err);
    })
    .then(() => {
      const user = new User(userData);
      user.save();
    });

  res.send();
});

module.exports = router;
