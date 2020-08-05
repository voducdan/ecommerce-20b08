const User = require('../../models/user.model');
const errorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	try {
		const cart = req.body.cart;
		const updatedCart = await User.findByIdAndUpdate(
			req.user._id,
			{ cart },
			{
				new: true,
			}
		);
		return res.status(200).json({
			success: true,
			data: updatedCart.cart,
		});
	} catch (error) {
		return next(new errorResponse(error, 400));
	}
};
