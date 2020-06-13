const mongoose = require('mongoose');

const ErrorResponse = require('../../utils/errorResponse');
const Invoice = require('../../models/invoice.model');

module.exports = async (req, res, next) => {
	const categoryId = req.params.categoryId;

	try {
		const invoices = await Invoice.find({}).populate('course');
		let suggestionCourses = [];
		let courseIdList = [];
		for (let invoice of invoices) {
			for (let course of invoice.course) {
				if (course.category.parents_category._id.equals(categoryId)) {
					if (courseIdList.indexOf(course._id) < 0) {
						courseIdList.push(course._id);
						suggestionCourses.push(course);
						if (suggestionCourses.length === 3) {
							return res.status(200).json({
								success: true,
								data: suggestionCourses,
							});
						}
					}
				}
			}
		}
		return res.status(200).json({
			success: true,
			data: suggestionCourses,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 404));
	}
};
