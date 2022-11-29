const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const rootDir = require("../util/path");

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

var db;

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

router.post("/freeAdd/", (req, res, next) => {
  res.render("free.ejs");
  db.collection("counter").findOne({ name: "게시물개수" }, (err, out) => {
    let totalRegister = out.totalPost;

    db.collection("post").insertOne(
      {
        _id: totalRegister + 1,
        제목: req.body.title,
        내용: req.body.content,
      },
      () => {
        console.log("저장완료");
        db.collection("counter").updateOne(
          { name: "게시물개수" },
          { $inc: { totalPost: 1 } },
          (err, out) => {}
        );
      }
    );
  });
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
