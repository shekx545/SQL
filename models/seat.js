const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Seat = sequelize.define(
  "Seat",
  {
    row_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_in_schema: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sector_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sectors",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "venues",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    seat_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "seat_types",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "seats",
    timestamps: true,
  },
);

module.exports = { Seat };