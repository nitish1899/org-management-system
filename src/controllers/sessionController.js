const { Session } = require('../models');

exports.createSession = async (req, res) => {
    const { userId, token, currentOrganizationId } = req.body;
    try {
        const session = await Session.create({ user_id: userId, session_token: token, current_organization_id: currentOrganizationId });
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create session' });
    }
};

exports.updateSession = async (req, res) => {
    const { sessionId } = req.params;
    const { currentOrganizationId } = req.body;
    try {
        const session = await Session.findByPk(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        session.current_organization_id = currentOrganizationId;
        await session.save();
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update session' });
    }
};
