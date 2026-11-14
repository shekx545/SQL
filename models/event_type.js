const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const EventType = sequelize.define(
  "EventType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "event_types",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "event_types",
    timestamps: true,
  },
);

module.exports = { EventType };