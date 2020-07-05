const express = require('express');

const router = express.Router();

const { authorize, checkToken } = require('../middleware/auth');

const createUser = require('../controllers/user/createUser');
const getUsers = require('../controllers/user/getUsers');
const getUser = require('../controllers/user/getUser');
const updateUser = require('../controllers/user/updateUser');
const uploadAvt = require('../controllers/user/uploadAvt');
const login = require('../controllers/user/login');
const upload = require('../config/multer-storage');

router.route('/all').get(checkToken, authorize('Admin'), getUsers);

router
	.route('/')
	.get(checkToken, getUser)
	.post(createUser)
	.put(checkToken, updateUser);

router.post('/auth', login);
router.post('/upload/avt', checkToken, upload.single('avt'), uploadAvt);
module.exports = router;
