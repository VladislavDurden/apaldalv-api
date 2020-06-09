const moment = require('moment');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BadRequestError =require('../errors/BadRequestError');

const User = require('../models/user');

const JWT_SECRET_KEY = "5Ykhg7D100bG";


class AuthenticationService {
	async register(email, password) {
		const isUserExists = await User.findOne({ email });

		if (isUserExists) {
			throw new BadRequestError("User already exists");
		}



	};

	async login(email, password) {

	};
}

const generateToken = (userId) => {
	return jwt.sign(
		{},
		JWT_SECRET_KEY,
		{
			subject: userId,
			expiresIn: '24h'
		}
	);
};

const createUser = async (email, password) => {
	const hashedPassword = await bcrypt.hash(password, 12);
	const user = new User({
		email,
		password: hashedPassword,
		createdDate: moment().format(),
		status: 'REGISTERED',
	});
	await user.save();
};

const instance = new AuthenticationService();
module.exports = instance;
