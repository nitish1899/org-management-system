const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    const { username, password, email, roleId } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password_hash: hashedPassword,
            email,
            role_id: roleId
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
