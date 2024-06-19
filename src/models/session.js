module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    user_id: DataTypes.INTEGER,
    session_token: DataTypes.STRING,
    current_organization_id: DataTypes.INTEGER
  }, {});

  Session.associate = function(models) {
    Session.belongsTo(models.User, { foreignKey: 'user_id' });
    Session.belongsTo(models.Organization, { foreignKey: 'current_organization_id' });
  };

  return Session;
};
