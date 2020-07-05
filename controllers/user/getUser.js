const ErrorResponse = require('../../utils/errorResponse');
module.exports = (req, res, next) => {
	try {
		return res.status(200).json({
			success: true,
			data: req.user,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};
