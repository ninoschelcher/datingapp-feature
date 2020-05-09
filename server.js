const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.status(404).send("404 page not found");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
