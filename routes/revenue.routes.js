const express = require('express');

const { authorize, checkToken } = require('../middleware/auth');
const revunueResult = require('../controllers/revenue/revenueResult');
const revunueCategoryResult = require('../controllers/revenue/revunueCategoryResult');

const router = express.Router();

router.route('/date').get(checkToken, authorize('Admin'), revunueResult);
router
	.route('/category')
	.get(checkToken, authorize('Admin'), revunueCategoryResult);

module.exports = router;
