const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.set("view engine", "ejs");

var db;

MongoClient.connect(
  "mongodb+srv://admin:1q2w3e4r!@cluster0.tb8du5i.mongodb.net/firstwep?retryWrites=true&w=majority",
  (err, client) => {
    if (err) return console.log(err);

    db = client.db("firstwep");

    app.listen(7000, () => {
      console.log("listening on 7000");
    });
  }
);

const homePage = require("./routes/home");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// freeBoard

app.use("/detail/:id", (req, res, next) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      res.render("view.ejs", { posts: result });
    }
  );
});

app.get("/client/freeBoard", (req, res, next) => {
  // 디비에 저장된 post라는 collection 안의 모든 데이터를 꺼내주세요
  db.collection("post")
    .find()
    .toArray((err, out) => {
      console.log(out);
      res.render("free.ejs", { posts: out });
      next();
    });
});

app.use("/client/freeBoard/register", (req, res, next) => {
  res.render("register.ejs");
  next();
});

app.post("/client/freeBoard/Add", (req, res, next) => {
  res.render("add.ejs");
  console.log(req.body);
  db.collection("counter").findOne({ name: "게시물개수" }, (err, out) => {
    let totalRegister = out.totalPost;

    db.collection("post").insertOne(
      {
        _id: totalRegister + 1,
        제목: req.body.title1,
        내용: req.body.content1,
      },
      () => {
        db.collection("counter").updateOne(
          { name: "게시물개수" },
          { $inc: { totalPost: 1 } },
          (err, out) => {
            if (err) return console.log(err);
          }
        );
      }
    );
  });
  next();
});

// dealBoard

app.use("/dealDetail/:id", (req, res, next) => {
  db.collection("deal").findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      res.render("dealView.ejs", { deal: result });
    }
  );
});

app.get("/client/dealBoard", (req, res, next) => {
  db.collection("deal")
    .find()
    .toArray((err, out) => {
      console.log(out);
      res.render("deal.ejs", { deal: out });
      next();
    });
});

app.use("/client/dealBoard/register", (req, res, next) => {
  res.render("dealRegister.ejs");
  next();
});

app.post("/client/dealBoard/Add", (req, res, next) => {
  res.render("add.ejs");
  console.log(req.body);
  db.collection("dealcounter").findOne({ name: "게시물개수" }, (err, out) => {
    let totalRegister = out.totalPost;

    db.collection("deal").insertOne(
      {
        _id: totalRegister + 1,
        제목: req.body.title,
        내용: req.body.content,
      },
      () => {
        db.collection("dealcounter").updateOne(
          { name: "게시물개수" },
          { $inc: { totalPost: 1 } },
          (err, out) => {
            if (err) return console.log(err);
          }
        );
      }
    );
  });
});

// app.use("/dealBoard", (req, res, next) => {
//   res.render("home.ejs");
// });

app.get("/", (req, res, next) => {
  res.render("home.ejs");
});

// const dealBoard = require("./routes/dealBoard");
// app.use("/client", dealBoard);
// app.use("/client", freeBoard);
app.use(homePage);

app.use((req, res, next) => {
  res.status(404).send("<h1>Not Found</h1>");
});
