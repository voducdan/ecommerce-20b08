const express = require('express');

const router = express.Router();

const { authorize, checkToken } = require('../middleware/auth');

const createUser = require('../controllers/user/createUser');
const getUsers = require('../controllers/user/getUsers');
const getUser = require('../controllers/user/getUser');
const updateUser = require('../controllers/user/updateUser');
const uploadAvt = require('../controllers/user/uploadAvt');
const changePass = require('../controllers/user/changePass');
const login = require('../controllers/user/login');
const getPayment = require('../controllers/user/getPayment');
const updatePayment = require('../controllers/user/updatePayment');
const getUserCourses = require('../controllers/user/getUserCourses');
const getUserCart = require('../controllers/user/getUserCart');
const updateUserCart = require('../controllers/user/updateUserCart');
const deleteCartItem = require('../controllers/user/deleteCartItem');

const {
	forgotPassword,
	resetPassword,
} = require('../controllers/user/resetPassword');
const upload = require('../config/multer-storage');

router.route('/all').get(checkToken, authorize('Admin'), getUsers);

router
	.route('/')
	.get(checkToken, getUser)
	.post(createUser)
	.put(checkToken, updateUser);

router.post('/auth', login);
router.post('/upload/avt', checkToken, upload.single('avt'), uploadAvt);
router.put('/password', checkToken, changePass);
router
	.route('/payment')
	.get(checkToken, getPayment)
	.post(checkToken, updatePayment);
router.get('/courses', checkToken, getUserCourses);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);
router.get('/cart', checkToken, getUserCart);
router
	.route('/cart')
	.post(checkToken, updateUserCart)
	.put(checkToken, deleteCartItem);
module.exports = router;
