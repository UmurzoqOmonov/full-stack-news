// news
// Columns
/*
id:PK, 
tittle:string,
brief:string,
text:string,
banner:string,
viewCounts:number,

categoryId:FK, 
createdBy:FK
*/

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../core/config/db");

const news = sequelize.define(
  "news",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    brief: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewCounts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
  }
);

module.exports = news;
