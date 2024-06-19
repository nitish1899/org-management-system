const { Task } = require('../models');

exports.createTask = async (req, res) => {
    const { taskName, description, organizationId, createdBy, assignedTo } = req.body;
    try {
        const task = await Task.create({ task_name: taskName, description, organization_id: organizationId, created_by: createdBy, assigned_to: assignedTo });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
