const path = require("path");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/dealBoard", (req, res, next) => {
  res.render("deal.ejs");
  next();
});

router.use("/dealBoard/post", (req, res, next) => {
  res.render("dealView.ejs");
  next();
});

router.use("/dealBoard/register", (req, res, next) => {
  res.render("dealRegister.ejs");
  next();
});

router.post("/client/dealAdd", (req, res, next) => {
  res.render("dealRegister.ejs");
});

router.use("/dealBoard", (req, res, next) => {
  res.render("home.ejs");
});

router.get("/", (req, res, next) => {
  res.render("home.ejs");
});

module.exports = router;
