const express = require('express');
const router = express.Router();
const moment = require('moment');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BadRequestError =require('../errors/BadRequestError');

const User = require('../models/user');
const JWT_SECRET_KEY = "5Ykhg7D100bG";

router.post('/register', [check('email', 'Incorrect email').isEmail(), check('password', 'Minimal password length 6 symbols').isLength({ min: 6 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect registration data',
        })
    }

    const {email, password} = req.body;
    let userData;

    await User.findOne({email}, (err, data) => {
        userData = data;
        if(userData._id){
            res.status(400).json({message: "Email already in use"});
        }
    });

    const hashedPassword = await bcrypt.hash(password, 12);
    // const token = jwt.sign(
    //   {},
    //   JWT_SECRET_KEY,
    //   {
    //       subject: userId,
    //       expiresIn: '24h'
    //   }
    // );
    const user = new User({
        email,
        password: hashedPassword,
        createdDate: moment().format(),
        status: 'REGISTERED'
    });

    user.save()
      .then(() => {
          res.json(user);
      })
      .catch(() => {
          res.status(500).json({message: "Server error"});
      })
});

router.post('/login', [check('email', 'Plese send a correct email').normalizeEmail().isEmail(), check('password', 'Send passord').exists()], async (req, res) => {
//const userData = req.body;

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array,
                message: 'Incorrect login data',
            })
        }
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, User.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        const token = jwt.sign(
            { userId: user.id },
            jwtSecretKey,
            { expiresIn: '120h' },
        );
        res.json({ token, userId: user.id });

    } catch (e) {
        res.status(500).json({ message: "Something went wrong" })
    }

  //res.json(userData);
  //res.send();
});

module.exports = router;
