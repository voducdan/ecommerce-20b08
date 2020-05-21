const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	// log error to console
	console.log(err.message);

	// mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = 'Id not found';
		error = new ErrorResponse(message, 404);
	}

	// mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value';
		error = new ErrorResponse(message, 400);
	}

	// mongoose validation error
	if (err.name === 'ValidationError') {
		const message = err.errors.message;
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server failed',
	});
};

module.exports = errorHandler;
