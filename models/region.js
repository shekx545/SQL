const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Region = sequelize.define(
  "Region",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "regions",
    timestamps: true,
  },
);

module.exports = { Region };