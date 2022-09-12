const category = require("../models/categoryModel");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
exports.getAdminPanel = async (req, res) => {
  const allCategories = await category.findAll();
  res.render("admin/adminPanel");
};
