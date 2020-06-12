const checkDate = require('../utils/validateDate');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
	const query = { ...req.query };
	if (!checkDate(query)) {
		return next(new ErrorResponse('Entered date is invalid', 400));
	}
	if (Object.entries(query).length == 0) {
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const usersInMonth = await User.find({ month, year });
		const numOfUsersInMonth = await User.getUsersInMonth(month, year);
		return res.json({
			success: true,
			data: {
				usersInMonth,
				numOfUsersInMonth,
			},
		});
	}
	if (query.month) {
		const year = new Date().getFullYear();
		const usersInMonth = await User.find({ month: query.month, year });
		const numOfUsersInMonth = await User.getUsersInMonth(query.month, year);
		return res.json({
			success: true,
			data: {
				usersInMonth,
				numOfUsersInMonth,
			},
		});
	}

	return next(new ErrorResponse('Please provide valid infomation', 400));
};
