const User = require('../../models/user.model');
const errorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	const body = { ...req.body.params };
	try {
		const newUser = new User(body);
		const createdUser = await newUser.save();
		const token = createdUser.getSignedJWT();
		return res.status(200).json({
			success: true,
			token,
		});
	} catch (error) {
		return next(new errorResponse(error, 400));
	}
};
