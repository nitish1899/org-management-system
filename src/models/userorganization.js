module.exports = (sequelize, DataTypes) => {
  const UserOrganization = sequelize.define('UserOrganization', {
    user_id: DataTypes.INTEGER,
    organization_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});

  UserOrganization.associate = function (models) {
    UserOrganization.belongsTo(models.User, { foreignKey: 'user_id' });
    UserOrganization.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    UserOrganization.belongsTo(models.Role, { foreignKey: 'role_id' });
  };

  return UserOrganization;
};
