const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const District = sequelize.define(
  "District",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "regions",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "districts",
    timestamps: true,
  },
);

module.exports = { District };