const { validationResult } = require("express-validator");
const AppError = require("../ErrorHandler/App-Error");
const catchAsync = require("../ErrorHandler/catchAsync");
const category = require("../models/categoryModel");
const users = require("../models/usersModel");
const news = require("../models/newsModel");
// const forHtml = fs.readFileSync("../views/categories.html", "utf-8");

exports.getCategories = catchAsync(async (req, res, next) => {
  const allCategories = await category.findAll();
  const allUsers = await users.findAll();
  // const allNews = await news.findAll();

  res.render("admin/category/categories", {
    allCategories,
    allUsers,
    errors: [],
  });
});

exports.getByIdCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await category.findByPk(id);
  const allUsers = await users.findAll();
  // const allNews = await news.findAll();

  if (!byId) return next(new AppError("No found byId that ID", 404));

  res.render("admin/category/byIdCategory", { byId, allUsers, errors: [] });
});

exports.newFormCategory = catchAsync(async (req, res) => {
  res.render("admin/category/new-category", { errors: [] });
});

exports.edit = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await category.findByPk(id);

  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  res.render("admin/category/edit-category", { byId, errors: [] });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const validationRes = validationResult(req);
  const { id } = req.params;
  const byId = await category.findByPk(id);
  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  if (validationRes.isEmpty()) {
    const { name } = req.body;
    try {
      await byId.update({ name });
      res.redirect("/admin/categories");
    } catch (error) {
      res.send(`<div>
    <h1>Error</h1>
    <p>${error}</p>
    </div>`);
    }
  } else {
    res.render("admin/category/edit-category", {
      byId,
      errors: validationRes.errors.map((e) => e.msg),
    });
  }
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    res.render("admin/category/new-category", {
      errors: validationRes.errors.map((e) => e.msg),
    });
  }

  const { name } = req.body;
  if (!name) return next(new AppError(`Didn't enter ${name} NAME`, 400));

  await category.create({ name });
  res.redirect("/admin/categories");
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await category.findByPk(id);
  if (!byId) return next(`No found ${byId} that ID`, 404);
  await byId.destroy();
  res.redirect("/admin/categories");
});
