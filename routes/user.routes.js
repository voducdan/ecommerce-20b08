const express = require('express');

const router = express.Router();

const createUser = require('../controllers/user/createUser');

router.route('/').post(createUser);

module.exports = router;
