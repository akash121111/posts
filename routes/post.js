const express = require('express');
const { contactCreate, getContact, getAllContact, deleteContact } = require('../controllers/post');
const { isUser } = require('../middleware/auth');
const router = express.Router();

router.post('/', contactCreate);
router.get('/', getContact);
router.get('/all', getAllContact);
router.put('/:id', deleteContact);

module.exports = router;
