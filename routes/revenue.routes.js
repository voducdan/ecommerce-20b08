const express = require('express');

const revunueResult = require('../controllers/revenueResult');

const router = express.Router();

router.route('/').get(revunueResult);

module.exports = router;
