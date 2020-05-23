const express = require('express');
const router = express.Router();

// const {MongoClient} = require('mongodb');
// const client = new MongoClient(uri);
// const DB_NAME = 'apaldalv';

const mongoose = require('mongoose');
const uri = `mongodb+srv://admin:apaldalv!_@cluster0-1qm9j.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true`;

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

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      const db = mongoose.connection;

      db.on('error', console.error.bind(console, 'connection error:'));

      db.once('open', function() {
        console.log("Connection Successful!");

        const UserSchema = mongoose.Schema({
          email: String,
          password: String,
        });

        const UserModel = mongoose.model('User', UserSchema, 'users');
        const user = new UserModel(userData);

        user.save((err, user) => {
          if (err) return console.error(err);
          console.log(user.email + " saved to bookstore collection.");
        });
      });
    });



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
