const express = require('express');
const { createTask, getTasks, getUserTasksGroupedByOrganization } = require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createTask);
router.get('/', authenticate, getTasks);
router.get('/user/:userId/tasks', authenticate, getUserTasksGroupedByOrganization);

module.exports = router;
