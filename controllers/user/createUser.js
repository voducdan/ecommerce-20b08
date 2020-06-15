const User = require('../../models/user.model');
const errorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	const body = { ...req.body.params };
	try {
		const createdUser = await User.create(body);
		return res.status(200).json({
			success: true,
			data: createdUser,
		});
	} catch (error) {
		return next(new errorResponse(error, 400));
	}
};
