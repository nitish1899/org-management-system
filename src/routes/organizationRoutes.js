const express = require('express');
const { createOrganization, getOrganizations } = require('../controllers/organizationController');
const authenticate = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorizeAdmin, createOrganization);
router.get('/', authenticate, getOrganizations);

module.exports = router;
