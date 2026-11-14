const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const VenuePhoto = sequelize.define(
  "VenuePhoto",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    tableName: "venue_photos",
    timestamps: true,
  },
);

module.exports = { VenuePhoto };