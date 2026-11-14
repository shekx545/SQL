module.exports = (sequelize, DataTypes) => {
  const DeliveryMethod = sequelize.define(
    "DeliveryMethod",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "delivery_methods",
      timestamps: true,
    }
  );

  return DeliveryMethod;
};