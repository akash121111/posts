const express = require('express');
const { userRegistration, userLogin, userProfile } = require('../controllers/user');
const router = express.Router();

router.get('/', userRegistration);
router.post('/', userLogin);
router.get('/me', userProfile);

module.exports = router;
