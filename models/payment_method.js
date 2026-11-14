const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const PaymentMethod = sequelize.define(
  "PaymentMethod",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "payment_methods",
    timestamps: true,
  },
);

module.exports = { PaymentMethod };