const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Gender = sequelize.define(
  "Gender",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "genders",
    timestamps: true,
  },
);

module.exports = { Gender };