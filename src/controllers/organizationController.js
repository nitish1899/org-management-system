const { Organization, UserOrganization } = require('../models');

exports.createOrganization = async (req, res) => {
    const { organizationName, userId, roleId } = req.body;
    try {
        const organization = await Organization.create({ organization_name: organizationName });
        await UserOrganization.create({ user_id: userId, organization_id: organization.organization_id, role_id: roleId });
        res.status(201).json(organization);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create organization' });
    }
};

exports.getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.findAll();
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch organizations' });
    }
};
