const Course = require('../../models/course.model');
const ErrorResponse = require('../../utils/errorResponse');
const Review = require('../../models/reivew.model');
const mongoose = require('mongoose');
module.exports = async (req, res, next) => {
	try {
		let review = {};
		review.content = req.body.reviewContent;
		review.content = req.body.reviewContent;
		review.course = mongoose.Types.ObjectId(req.body.course);
		review.rating = req.body.rate;
		review.user = mongoose.Types.ObjectId(req.user._id);
		const reviewInstance = new Review(review);
		await reviewInstance.save();
		const course = await Course.find({ _id: review.course });
		const newRate = (course[0].avg_rating + review.rating) / 2;
		await Course.findByIdAndUpdate(review.course, {
			avg_rating: Number(newRate.toFixed(2)),
		});
		const reviews = await Review.find({ course: review.course }).sort({
			create_at: -1,
		});
		console.log(reviews);
		return res.status(200).json({
			success: true,
			data: reviews,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};
