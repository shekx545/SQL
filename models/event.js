const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Event = sequelize.define(
  "Event",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    finish_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    finish_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    event_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "event_types",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    human_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "human_categories",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    venue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "venues",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    lang_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "langs",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "events",
    timestamps: true,
  },
);

module.exports = { Event };