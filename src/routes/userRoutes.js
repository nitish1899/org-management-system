const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createUser);
router.get('/', authenticate, getUsers);

module.exports = router;
