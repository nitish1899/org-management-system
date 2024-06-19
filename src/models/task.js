module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    task_name: DataTypes.STRING,
    description: DataTypes.STRING,
    organization_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    assigned_to: DataTypes.INTEGER
  }, {});

  Task.associate = function (models) {
    Task.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    Task.belongsTo(models.User, { as: 'Creator', foreignKey: 'created_by' });
    Task.belongsTo(models.User, { as: 'Assignee', foreignKey: 'assigned_to' });
  };

  return Task;
};
