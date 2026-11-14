const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Lang = sequelize.define(
  "Lang",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "langs",
    timestamps: true,
  },
);

module.exports = { Lang };