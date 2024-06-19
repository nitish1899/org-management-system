const { User } = require('../models');

const authorizeAdminAndManager = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.role_id !== 1 || user.role_id !== 2) { // Assuming role_id 1 is for admin , 2 for Manager and 3 for Member
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to authorize user' });
    }
};

module.exports = authorizeAdminAndManager;
