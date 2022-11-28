const path = require("path");
const express = require("express");
const app = express();

const rootDir = require("../util/path");

const router = express.Router();

router.get("/freeBoard", (req, res, next) => {
  res.render("free.ejs");
  next();
});

router.use("/freeBoard/post", (req, res, next) => {
  res.render("view.ejs");
  next();
});

router.use("/freeBoard/register", (req, res, next) => {
  res.render("register.ejs");
  next();
});

router.use("/freeBoard", (req, res, next) => {
  res.render("free.ejs");
  next();
});

router.get("/", (req, res, next) => {
  res.render("home.ejs");
});

module.exports = router;
