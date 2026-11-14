module.exports = (sequelize, DataTypes) => {
  const CustomerAddress = sequelize.define(
    "CustomerAddress",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      house: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      post_index: {
        type: DataTypes.STRING,
      },
      info: {
        type: DataTypes.TEXT,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      flat_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "customer_addresses",
      timestamps: true,
    }
  );

  return CustomerAddress;
};