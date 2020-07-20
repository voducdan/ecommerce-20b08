const User = require('../../models/user.model');
const fs = require('fs');
const globalVar = require('../../globalVar');
const path = require('path');
const ErrorHandler = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	try {
		const splitedPath = req.file.path.split('\\');
		const imagePath =
			'/' + splitedPath.slice(1, splitedPath.length).join('/');
		if (req.user.image) {
			const oldImagePath = path.join(
				__dirname,
				'..',
				'..',
				'uploads',
				req.user.image
			);
			fs.unlinkSync(oldImagePath);
		}
		const updatedUser = await User.findByIdAndUpdate(req.user._id, {
			image: imagePath,
		});
		return res.status(200).json({
			success: true,
			data: updatedUser,
		});
	} catch (error) {
		return next(new ErrorHandler(error, 500));
	}
};
