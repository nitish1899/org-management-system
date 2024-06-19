module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    organization_name: DataTypes.STRING
  }, {});

  Organization.associate = function (models) {
    Organization.belongsToMany(models.User, {
      through: 'UserOrganization',
      foreignKey: 'organization_id'
    });
    Organization.hasMany(models.Task, { foreignKey: 'organization_id' });
  };

  return Organization;
};
