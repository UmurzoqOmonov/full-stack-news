const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const AppError = require("../ErrorHandler/App-Error");
const catchAsync = require("../ErrorHandler/catchAsync");
const news = require("../models/newsModel");
const category = require("../models/categoryModel");
const user = require("../models/usersModel");
const { type, append } = require("express/lib/response");

exports.getAllNews = catchAsync(async (req, res, next) => {
  const allNews = await news.findAll();
  res.render("admin/news/newsBlog", { allNews, errors: [] });
});

exports.getByIdNews = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await news.findByPk(id);
  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  res.render("admin/news/byIdNews", { byId, errors: [] });
});

exports.newRender = catchAsync(async (req, res, next) => {
  const categories = await category.findAll();
  const users = await user.findAll();
  res.render("admin/news/newNews", { errors: [], categories, users });
});

exports.getEdit = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await news.findByPk(id);
  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  const categories = await category.findAll();
  const users = await user.findAll();

  res.render("admin/news/editNews", {
    byId,
    categories,
    users,
    errors: [],
  });
});

exports.createNews = catchAsync(async (req, res, next) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    res.render("admin/news/newNews", {
      errors: validationRes.errors.map((e) => e.msg),
    });
  }
  await news.create({ ...req.body, banner: req.file.filename });
  res.redirect("/admin/news");
});

exports.updateNews = catchAsync(async (req, res, next) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.render("admin/news/editNews", {
      errors: validationRes.errors.map((e) => e.msg),
    });
  }

  const { id } = req.params;
  const byId = await news.findByPk(id);
  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  await byId.update(req.body);

  res.redirect("/admin/news");
});

exports.deleteNews = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await news.findByPk(id);
  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  await byId.destroy();

  res.redirect("/admin/news");
});
