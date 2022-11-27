const path = require("path");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/freeBoard", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "free.html"));
  next();
});

router.use("/freeBoard/post", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "view.html"));
  next();
});

router.use("/freeBoard/register", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "register.html"));
});

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = router;
