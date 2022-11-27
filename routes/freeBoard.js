const path = require("path");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/freeBoard", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "free.html"));
  next();
});

router.use("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = router;
