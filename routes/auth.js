const express = require('express');
const router = express.Router();

const {MongoClient} = require('mongodb');
const uri = `mongodb+srv://admin:apaldalv!_@cluster0-1qm9j.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true`;
const client = new MongoClient(uri);
const DB_NAME = 'apaldalv';

router.post('/login', async (req, res) => {
  const requestBody = req.body;
  const error = 'Something went wrong!';

  if(!requestBody) {
		res.send(error);
  }

  const userData = {
    email: requestBody.email,
    password: requestBody.password
  };

  await client.db(DB_NAME).collection("users").insertOne(userData);

  res.json(userData);
  res.send();
});

router.post('/register', function(req, res) {
  const userData = req.body;

  if(!userData) {
    console.log('Empty user data');
  }

  res.json(userData);
  res.send();
});

module.exports = router;
