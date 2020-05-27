const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true},
	createdDate: String,
	status: String,
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
