const errorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.authorize = (...roles) => {
	return (req, res, next) => {
		const userRole = req.user.role;
		if (!roles.includes(userRole)) {
			return next(new errorResponse('Unauthorized'), 403);
		}
		next();
	};
};

exports.checkToken = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new errorResponse('Unauthenticated', 401));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded._id);
		next();
	} catch (error) {
		return next(new errorResponse(error, 401));
	}
};
