const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Venue = sequelize.define(
  "Venue",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    site: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    schema: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "regions",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    district_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "districts",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "venues",
    timestamps: true,
  },
);

module.exports = { Venue };