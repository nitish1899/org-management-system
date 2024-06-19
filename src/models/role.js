module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_name: DataTypes.STRING
  }, {});
  Role.associate = function (models) {
    Role.hasMany(models.User, { foreignKey: 'role_id' });
    Role.hasMany(models.UserOrganization, { foreignKey: 'role_id' });
  };
  return Role;
};
