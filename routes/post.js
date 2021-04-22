const express = require('express');
const { contactCreate, getContact } = require('../controllers/post');
const { isUser } = require('../middleware/auth');
const router = express.Router();

router.post('/', contactCreate);
router.get('/', getContact);

module.exports = router;
