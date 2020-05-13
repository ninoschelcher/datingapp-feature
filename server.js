const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.sendFile(__dirname + "/static/index.html"));
app.get("/about", (req, res) => res.sendFile(__dirname + "/static/about.html"));
app.get("/login", (req, res) => res.sendFile(__dirname + "/static/login.html"));
app.get("/profile", (req, res) =>
  res.sendFile(__dirname + "/static/profile.html")
);

app.get("/step2", (req, res) => res.sendFile(__dirname + "/static/step2.html"));
app.get("/mp3", (req, res) => res.sendFile(__dirname + "/static/mauw.mp3"));
app.get("/profile/:profileId-:name", (req, res) => res.send(req.params));

app.use(express.static(__dirname + "/static"));

app.use(function (req, res, next) {
  res.status(404).send("404 Page not found");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
