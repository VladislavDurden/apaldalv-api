module.exports = function BadRequestError(message) {
	this.type = this.constructor.name;
	this.message = message || 'Bad request';
	this.statusCode = 400;
};

require('util').inherits(module.exports, Error);
