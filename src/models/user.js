module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'role_id',
      },
    },
  });

  User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: 'role_id' });
    User.belongsToMany(models.Organization, {
      through: 'UserOrganization',
      foreignKey: 'user_id',
    });
    User.hasMany(models.Task, { foreignKey: 'created_by' });
    User.hasMany(models.Task, { foreignKey: 'assigned_to' });
    User.hasMany(models.Session, { foreignKey: 'user_id' });
  };

  return User;
};


