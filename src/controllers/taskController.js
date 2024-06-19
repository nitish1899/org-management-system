const { Task } = require('../models');
const { sequelize } = require('../models');

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

exports.getUserTasksGroupedByOrganization = async (req, res) => {
    const userId = req.params.userId;

    const query = `
    SELECT 
        o.organization_name,
        t.task_id,
        t.task_name,
        t.description
    FROM 
        Users u
    JOIN 
        UserOrganizations uo ON u.user_id = uo.user_id
    JOIN 
        Organizations o ON uo.organization_id = o.organization_id
    JOIN 
        Tasks t ON o.organization_id = t.organization_id
    WHERE 
        u.user_id = :userId
    ORDER BY 
        o.organization_name, t.task_name;
  `;

    try {
        const tasks = await sequelize.query(query, {
            replacements: { userId: userId },
            type: sequelize.QueryTypes.SELECT
        });

        const groupedTasks = tasks.reduce((result, task) => {
            (result[task.organization_name] = result[task.organization_name] || []).push(task);
            return result;
        }, {});

        res.json(groupedTasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

