const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.set("view engine", "ejs");

var db;

MongoClient.connect(
  "mongodb+srv://admin:1q2w3e4r!@cluster0.tb8du5i.mongodb.net/first-weq?retryWrites=true&w=majority",
  (err, client) => {
    if (err) return console.log(err);

    db = client.db("first-weq");

    app.listen(7000, () => {
      console.log("listening on 7000");
    });
  }
);

const homePage = require("./routes/home");
const freeBoard = require("./routes/freeBoard");
const dealBoard = require("./routes/dealBoard");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/client", dealBoard);
app.use("/client", freeBoard);
app.use(homePage);

app.use((req, res, next) => {
  res.status(404).send("<h1>Not Found</h1>");
});
