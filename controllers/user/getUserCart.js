const User = require('../../models/user.model');
const errorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	try {
		if (req.user && req.user._id) {
			const cart = await User.find({ _id: req.user._id }, 'cart');
			return res.status(200).json({
				success: true,
				data: cart[0]['cart'],
			});
		}
		return res.status(403).json({
			success: false,
		});
	} catch (error) {
		return next(new errorResponse(error, 400));
	}
};
