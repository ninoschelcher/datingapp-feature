const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.sendFile(__dirname + "/static/index.html"));
app.get("/about", (req, res) => res.sendFile(__dirname + "/static/about.html"));

app.use(express.static("static"));

app.use(function (req, res, next) {
  res.status(404).send("404 Page not found");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
