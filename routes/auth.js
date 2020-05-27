const express = require('express');
const router = express.Router();
const moment = require('moment');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const jwtSecretKey = "Anchors"

const mongoose = require('mongoose');
const DB_NAME = 'admin';
const DB_PASSWORD = 'wbMuYre6';
const DB = 'apaldalv';
const uri = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0-1qm9j.mongodb.net/${DB}?retryWrites=true&w=majority&useUnifiedTopology=true`;

router.post('/login', [check('email', 'Plese send a correct email').normalizeEmail().isEmail(), check('password', 'Send passord').exists()], async (req, res) => {
//const userData = req.body;

    try {
        const errors = validationResult(req)

        if (errors.isEmpty) {
            return res.status(400).json({
                errors: errors.array,
                message: 'Incorrect login data'
            })
        }
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, User.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        const token = jwt.sign(
            { userId: user.id },
            jwtSecretKey,
            { expiresIn: '72h' },
        )
        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }

  //res.json(userData);
  //res.send();
});

router.post('/register', [check('email', 'Incorrect email').isEmail(), check('password', 'Minimal password lenght 6 symbols').isLength({ min: 6 })],
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }

        const { email, password } = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(400).json({ message: "User already exists" })

        }
        const hashedPassword = await bcrypt.hash(password, 12) 
        const user = new User({ email, password: hashedPassword, createdDate: moment().format(), status: 'REGISTERED' })

        await user.save()
        res.status(201).json({ message: "User was created" })


    } catch (e) {
        res.status(500).json({ message: "Server error 500" })
    }
  /*const requestBody = req.body;

  if (!requestBody) {
    res.send('Empty user data!');
  }*/

  /*const userData = {
    email: requestBody.email,
    password: requestBody.password,
    createdDate: moment().format(),
    status: 'REGISTERED',
  };*/

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
      res.json(userData);
    });

 // res.send();
});

module.exports = router;
