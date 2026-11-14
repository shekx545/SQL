const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SeatType = sequelize.define(
  "SeatType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "seat_types",
    timestamps: true,
  },
);

module.exports = { SeatType };