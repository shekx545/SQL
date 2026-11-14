const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const VenueType = sequelize.define(
  "VenueType",
  {
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
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "types",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "venue_types",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["venue_id", "type_id"],
      },
    ],
  },
);

module.exports = { VenueType };