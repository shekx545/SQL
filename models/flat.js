const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Flat = sequelize.define(
  "Flat",
  {
    etaj: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "flats",
    timestamps: true,
  },
);

module.exports = { Flat };