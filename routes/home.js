const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();

router.use("/", (req, res, next) => {
  res.render("home.ejs");
});

module.exports = router;
