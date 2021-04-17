const express = require('express');
const { postCreate } = require('../controllers/post');
const { isUser } = require('../middleware/auth');
const router = express.Router();

router.post('/', isUser, postCreate);

module.exports = router;
