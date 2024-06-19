const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    email: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password_hash = await bcrypt.hash(user.password_hash, 10);
      }
    }
  });

  User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: 'role_id' });
    User.belongsToMany(models.Organization, {
      through: 'UserOrganization',
      foreignKey: 'user_id'
    });
    User.hasMany(models.Task, { foreignKey: 'created_by' });
    User.hasMany(models.Task, { foreignKey: 'assigned_to' });
    User.hasMany(models.Session, { foreignKey: 'user_id' });
  };

  return User;
};

