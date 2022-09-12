const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  port: 5432,
  database: "news_db",
  username: "postgres",
  password: "hp15",
  dialect: "postgres",
});

module.exports = sequelize;
