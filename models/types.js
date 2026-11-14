const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Types = sequelize.define(
  "Types",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "types",
    timestamps: true,
  },
);

module.exports = { Types };