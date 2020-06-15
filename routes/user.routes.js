const express = require('express');

const router = express.Router();

const { authorize, checkToken } = require('../middleware/auth');

const createUser = require('../controllers/user/createUser');
const getUsers = require('../controllers/user/getUsers');
const login = require('../controllers/user/login');

router
	.route('/')
	.get(checkToken, authorize('Admin'), getUsers)
	.post(createUser);

router.post('/auth', login);

module.exports = router;
