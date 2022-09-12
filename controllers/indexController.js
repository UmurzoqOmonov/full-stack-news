const category = require("../models/categoryModel");
const user = require("../models/usersModel");
const news = require("../models/newsModel");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
exports.getIndexAll = async (req, res) => {
  const allCategories = await category.findAll();
  const users = await user.findAll();
  const allNews = await news.findAll();

  res.render("index", { allCategories, users, allNews });
};

// exports.getIndexById = async (req, res) => {
//   const { id } = req.params;

//   const allCategories = await category.findAll();
//   const byIdNews = await news.findByPk(id);

//   res.render("news_detail", { allCategories, byIdNews });
// };
