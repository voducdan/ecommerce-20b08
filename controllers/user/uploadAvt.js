const User = require('../../models/user.model');
const fs = require('fs');
const path = require('path');
const ErrorHandler = require('../../utils/errorResponse');
const removeUnicode = require('../../utils/removeUnicode');
module.exports = async (req, res, next) => {
	try {
		if (req.user.image) {
			const oldImagePath = path.join(
				__dirname,
				'..',
				'..',
				'uploads',
				req.user.image
			);
			if (fs.existsSync(path)) {
				fs.unlinkSync(oldImagePath);
			}
		}
		const imagePath = `/images/${req.file.filename}`;
		console.log(imagePath);
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
