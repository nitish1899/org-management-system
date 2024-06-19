const { User, Session } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, email, roleId } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashedPassword', hashedPassword);
        const user = await User.create({
            username,
            password_hash: `${hashedPassword}`,
            email,
            role_id: roleId
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user.password_hash)
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            console.log(validPassword)
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await Session.create({ user_id: user.user_id, session_token: token });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};
