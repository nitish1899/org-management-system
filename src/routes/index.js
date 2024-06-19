const express = require('express');
const authRoutes = require('./authRoutes');
const organizationRoutes = require('./organizationRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const sessionRoutes = require('./sessionRoutes');
const errorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/organizations', organizationRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);

// Error handling middleware should be at the end
router.use(errorHandler);

module.exports = router;
