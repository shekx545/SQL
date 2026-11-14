const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Discount = sequelize.define(
  "Discount",
  {
    discount: { type: DataTypes.STRING, allowNull: false },
    finish_date: { type: DataTypes.DATEONLY },
  },
  {
    tableName: "discounts",
    timestamps: true,
  },
);

module.exports = { Discount };
