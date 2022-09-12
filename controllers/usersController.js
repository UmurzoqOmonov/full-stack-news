const users = require("../models/usersModel");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/App-Error");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await users.findAll();
  res.render("admin/users/users", { allUsers, errors: [] });
});

exports.getByIdUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await users.findByPk(id);
  if (!user) return next(new AppError(`No found ${id} that ID`, 404));
  res.render("admin/users/byIdUser", { user, errors: [] });
});

exports.add = catchAsync((req, res, next) => {
  res.render("admin/users/addUsers", { errors: [] });
});

exports.editUsers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await users.findByPk(id);
  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  res.render("admin/users/editUsers", { byId, errors: [] });
});

exports.createUsers = catchAsync(async (req, res, next) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    res.render("admin/users/addUsers", {
      errors: validationRes.errors.map((err) => err.msg),
    });
  }

  const { firstName, lastName, role, password } = req.body;
  await users.create({ firstName, lastName, role, password });
  res.redirect("/admin/users");
});

exports.updateUsers = catchAsync(async (req, res, next) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    res.render("admin/users/editUsers", {
      errors: validationRes.errors.map((err) => err.msg),
    });
  }

  const { firstName, lastName, role, password } = req.body;
  const { id } = req.params;
  const byId = await users.findByPk(id);
  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  await byId.update({ firstName, lastName, role, password });

  res.redirect("/admin/users");
});

exports.deleteUsers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await users.findByPk(id);
  if (!byId) return next(new AppError(`No found ${id} that ID`, 404));
  await byId.destroy();
  res.redirect("/admin/users");
});
