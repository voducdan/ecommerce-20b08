const multer = require('multer');
const path = require('path');
const removeUnicode = require('../utils/removeUnicode');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'uploads/images'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + removeUnicode(file.originalname));
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
