const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const TicketType = sequelize.define(
  "TicketType",
  {
    ticket_type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "ticket_types",
    timestamps: true,
  },
);

module.exports = { TicketType };