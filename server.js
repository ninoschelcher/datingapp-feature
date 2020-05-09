const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.get("/about", (req, res) => res.send("This is a about page"));
app.get("/contact", (req, res) => res.send("This is a contact page"));

app.use(express.static("public"));

app.use(function (req, res, next) {
  res.status(404).send("404 Page not found");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
