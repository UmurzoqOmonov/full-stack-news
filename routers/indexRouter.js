const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const getIndex = require("../controllers/indexController");

router.get("/", getIndex.getIndexAll);
// router.get("/:id", getIndex.getIndexById);

module.exports = router;
