const checkDate = require('../../utils/validateDate');
const ErrorResponse = require('../../utils/errorResponse');
const User = require('../../models/user.model');

module.exports = async (req, res, next) => {
	const query = { ...req.query };
	if (!checkDate(query)) {
		return next(new ErrorResponse('Entered date is invalid', 400));
	}
	if (Object.entries(query).length == 0) {
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const usersInMonth = await User.find({ month, year }).populate(
			'enrolled_courses'
		);
		const numOfUsersInMonth = await User.getUsersInMonth(month, year);
		const countUserInMonth = await User.getCountUsersInMonth(month, year);
		const usersInYear = await User.find({ year }).populate(
			'enrolled_courses'
		);
		const numOfUsersInYear = await User.getUsersInYear(year);
		const countUserInYear = await User.getCountUsersInYear(year);
		return res.json({
			success: true,
			data: {
				usersInMonth,
				numOfUsersInMonth,
				countUserInMonth,
				usersInYear,
				numOfUsersInYear,
				countUserInYear,
			},
		});
	}
	if (query.month) {
		const year = new Date().getFullYear();
		const usersInMonth = await User.find({
			month: query.month,
			year,
		})
			.select('firstname lastname email enrolled_courses  day month year')
			.populate('enrolled_courses', 'name');
		const numOfUsersInMonth = await User.getUsersInMonth(
			parseInt(query.month),
			year
		);
		const countUserInMonth = await User.getCountUsersInMonth(
			parseInt(query.month),
			year
		);
		return res.json({
			success: true,
			data: {
				usersInMonth,
				numOfUsersInMonth,
				countUserInMonth,
			},
		});
	}

	return next(new ErrorResponse('Please provide valid infomation', 400));
};
