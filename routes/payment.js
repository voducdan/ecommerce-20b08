const express = require('express');

const { authorize, checkToken } = require('../middleware/auth');
const pay = require('../controllers/payment/pay.controller');

const router = express.Router();

router.get('/pay', checkToken, pay);

module.exports = router;
