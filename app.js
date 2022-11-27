const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const homePage = require("./routes/home");
const freeBoard = require("./routes/freeBoard");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/client", freeBoard);
app.use(homePage);

app.use((req, res, next) => {
  res.status(404).send("<h1>Not Found</h1>");
});

app.listen(5000);
