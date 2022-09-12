const { DataTypes } = require("sequelize");
const sequelize = require("../core/config/db");
const news = require("./newsModel");

// Users Model
// Columns
/*
id:UUID,
firstName:string,
lastName:string,
password:string,
role:string,

*/
const usersModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,

      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

usersModel.hasMany(news);
news.belongsTo(usersModel);

module.exports = usersModel;
