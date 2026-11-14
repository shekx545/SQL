const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Sector = sequelize.define(
  "Sector",
  {
    sector_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "sectors",
    timestamps: true,
  },
);

module.exports = { Sector };