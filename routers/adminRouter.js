const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const upload = require("../core/config/uploader");
const getAdmin = require("../controllers/adminController");
const categoryController = require("../controllers/categoryController");
const newsController = require("../controllers/newsControllar");
const usersController = require("../controllers/usersController");

//
// GLOBAL ADMIN ROUTER
//

router.get("/", getAdmin.getAdminPanel);

//
// CATEGORIES ADMIN ROUTER
//

router
  .get("/categories", categoryController.getCategories)
  .get("/categories/edit/:id", categoryController.edit)
  .get("/categories/new", categoryController.newFormCategory)
  .get("/categories/:id", categoryController.getByIdCategory)
  .post(
    "/categories/new",
    body("name")
      .isLength({ min: 3 })
      .withMessage("Nom 3ta belgidan kam bo'lmasin"),
    categoryController.createCategory
  )
  .post(
    "/categories/edit/:id",
    body("name")
      .isLength({ min: 3 })
      .withMessage("Nom 3ta belgidan kam bo'lmasin"),
    categoryController.updateCategory
  )
  .get("/categories/delete/:id", categoryController.deleteCategory);

//
//   NEWS ADMIN ROUTER
//

router
  .get("/news", newsController.getAllNews)
  .get("/news/byId/:id", newsController.getByIdNews)
  .get("/news/new-news", newsController.newRender)
  .get("/news/edit-news/:id", newsController.getEdit)
  .post(
    "/news/new-news",
    [
      upload.single("banner"),
      body("title")
        .notEmpty()
        .withMessage("Title cannot empty")
        .isLength({ max: 1000 })
        .withMessage("Title max length 1000"),
      body("text")
        .notEmpty()
        .withMessage("Text cannot empty")
        .isLength({ max: 10000 })
        .withMessage("Text max length 10000"),
      body("brief")
        .notEmpty()
        .isLength({ max: 2000 })
        .withMessage("Brief max length 2000"),
      body("categoryId").notEmpty().withMessage("Category cannot selected"),
      body("userId").notEmpty().withMessage("User cannot selected"),
    ],
    newsController.createNews
  )
  .post(
    "/news/edit-news/:id",
    [
      upload.single("banner"),
      body("title")
        .notEmpty()
        .withMessage("Title cannot empty")
        .isLength({ max: 1000 })
        .withMessage("Title max length 1000"),
      body("text")
        .notEmpty()
        .withMessage("Text cannot empty")
        .isLength({ max: 10000 })
        .withMessage("Text max length 10000"),
      body("brief")
        .notEmpty()
        .isLength({ max: 2000 })
        .withMessage("Brief max length 2000"),
      body("categoryId").notEmpty().withMessage("Category cannot selected"),
      body("userId").notEmpty().withMessage("User cannot selected"),
    ],
    newsController.updateNews
  )
  .get("/news/delete/:id", newsController.deleteNews);

//
// USERS ADMIN ROUTER
//

router
  .get("/users", usersController.getAllUsers)
  .get("/users/byId/:id", usersController.getByIdUser)
  .get("/users/new", usersController.add)
  .get("/users/edit/:id", usersController.editUsers)
  .post(
    "/users/add-users",
    [
      body("firstName")
        .isLength({ min: 3 })
        .withMessage("Ims 3 tadan kam bo'lmasligi kerak"),
      body("lastName")
        .isLength({ min: 3 })
        .withMessage("Familiya 3 tadan kam bo'lmasligi kerak"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Parol 6 tadan kam bo'lmasligi kerak"),
      body("role")
        .isLength({ min: 3 })
        .withMessage("Vazifasining nomi 3 tadan kam bo'lmasligi kerak"),
    ],
    usersController.createUsers
  )
  .post(
    "/users/edit/:id",
    [
      body("firstName")
        .isLength({ min: 3 })
        .withMessage("Ims 3 tadan kam bo'lmasligi kerak"),
      body("lastName")
        .isLength({ min: 3 })
        .withMessage("Familiya 3 tadan kam bo'lmasligi kerak"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Parol 6 tadan kam bo'lmasligi kerak"),
      body("role")
        .isLength({ min: 3 })
        .withMessage("Vazifasining nomi 3 tadan kam bo'lmasligi kerak"),
    ],
    usersController.updateUsers
  )
  .get("/users/delete/:id", usersController.deleteUsers);

module.exports = router;
