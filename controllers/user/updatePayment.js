const User = require('../../models/user.model');
const ErrorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	const payment = {
		name_on_card: req.body.nameOnCard,
		card_number: req.body.cardNumber,
		date: req.body.expirtion_date,
		security_code: req.body.cvc,
		type: req.body.typeOfCard,
	};
	try {
		const paymentUpdated = await User.findByIdAndUpdate(
			req.user._id,
			{ payment },
			{ new: true }
		);
		return res.status(200).json({
			success: true,
			data: paymentUpdated,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};
