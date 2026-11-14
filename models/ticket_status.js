const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const TicketStatus = sequelize.define(
  "TicketStatus",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "ticket_statuses",
    timestamps: true,
  },
);

module.exports = { TicketStatus };