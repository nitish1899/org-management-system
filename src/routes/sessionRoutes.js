const express = require('express');
const { createSession, updateSession } = require('../controllers/sessionController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createSession);
router.put('/:sessionId', authenticate, updateSession);

module.exports = router;
