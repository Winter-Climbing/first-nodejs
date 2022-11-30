const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

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

app.use("/edit/:id", (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (err, result) => {
      res.render("edit.ejs", { post: result });
    }
  );
});

app.put("/edit", (req, res) => {
  db.collection("post").updateOne(
    { _id: parseInt(req.body.id) },
    { $set: { 제목: req.body.title1, 내용: req.body.content1 } },
    (err, result) => {
      console.log("수정완료");
    }
  );
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

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/fail",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      db.collection("login").findOne(
        { id: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);
          // 아무것도 없다면
          if (!결과)
            return done(null, false, { message: "존재하지않는 아이디요" });
          if (입력한비번 == 결과.pw) {
            return done(null, 결과);
          } else {
            return done(null, false, { message: "비번틀렸어요" });
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
  done(null, {});
});

// const dealBoard = require("./routes/dealBoard");
// app.use("/client", dealBoard);
// app.use("/client", freeBoard);
app.use(homePage);

app.use((req, res, next) => {
  res.status(404).send("<h1>Not Found</h1>");
});
