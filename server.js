/* Express Setup */
const express = require("express");
const app = express();
const port = 3000;

/* Express chain routes and other stuff */
app
  .use(express.static("public"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.sendFile("index"))
  .get("/steps", steps)
  .get("/login", (req, res) => res.sendFile(__dirname + "/public/login.html"))
  .get("/step2", (req, res) => res.sendFile(__dirname + "/public/step2.html"))
  .get("/profile", (req, res) =>
    res.sendFile(__dirname + "/public/profile.html")
  )
  .get("/profile/:profileId-:name", (req, res) => res.send(req.params))
  .use(function (req, res, next) {
    res.status(404).send("404 Page not found");
  })
  .listen(port);

/* First ejs test for the process of telling more about your goals and interest 
I have an array here with answers that dynamically create new answers in steps.ejs*/
const answers = [
  "Never, im lazy",
  "Sometimes",
  "2 times a week",
  "Every single day!",
];

function steps(req, res) {
  res.render("steps.ejs", { page: "Step 2", answers: answers, name: "Nino" });
}
