const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const HumanCategory = sequelize.define(
  "HumanCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    finish_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "genders",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "human_categories",
    timestamps: true,
  },
);

module.exports = { HumanCategory };