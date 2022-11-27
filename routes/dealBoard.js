const path = require("path");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/dealBoard", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "deal.html"));
  next();
});

router.use("/dealBoard/post", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "dealView.html"));
  next();
});

router.use("/dealBoard/register", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "dealRegister.html"));
});

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = router;
