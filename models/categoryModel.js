const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../core/config/db");
const news = require("./newsModel");

const categories = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    underscored: true,
  }
);

categories.hasMany(news);
news.belongsTo(categories);

module.exports = categories;
