const express = require('express');
const newUsers = require('../controllers/newuser/newUsers');
const { authorize, checkToken } = require('../middleware/auth');
const router = express.Router();

router.route('/newusers').get(checkToken, authorize('Admin'), newUsers);
module.exports = router;
