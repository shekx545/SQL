module.exports = (sequelize, DataTypes) => {
  const CustomerCard = sequelize.define(
    "CustomerCard",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
      },
      month: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_main: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "customer_cards",
      timestamps: true,
    }
  );

  return CustomerCard;
};