const express = require('express');
const { updateColor, getColor } = require('../controllers/color');

const { isUser } = require('../middleware/auth');
const router = express.Router();

router.patch('/', updateColor);
router.get('/', getColor);

module.exports = router;
