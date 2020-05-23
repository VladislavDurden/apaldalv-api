const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: String,
	password: String,
	createdDate: String,
	status: String,
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
