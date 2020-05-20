/* Express Setup */
const express = require("express");
const bodyParser = require("body-parser");
const slug = require("slug");
const find = require("array-find");
const app = express();
const port = 3000;

let users = [
  {
    firstname: "test",
    lastname: "test",
    age: "test",
    gender: "male",
    lookingfor: "female",
  },
  {
    firstname: "test2",
    lastname: "test2",
    age: "test2",
    gender: "female",
    lookingfor: "male",
  },
];

const answers = [
  "Never, im lazy",
  "Sometimes",
  "2 times a week",
  "Every single day!",
];

/* Express chain routes and other stuff */
app
  .use(express.static(__dirname + "/public"))
  .use(bodyParser.urlencoded({ extended: true }))
  .get("/:firstname", getUser)
  .set("view engine", "ejs")
  .get("/steps", steps)
  .get("/introduction", introduction)
  .post("/", submit)
  .use(function (req, res, next) {
    res.status(404).send("404 Page not found");
  })
  .listen(port);

/* First ejs test for the process of telling more about your goals and interest 
I have an array here with answers that dynamically create new answers in steps.ejs*/
function steps(req, res) {
  res.render("steps.ejs", {
    page: "Step 2",
    data: answers,
    name: "Nino",
    class: "steps",
  });
}

//Render the introduction page
function introduction(req, res) {
  res.render("introduction.ejs", {
    page: "Introduction",
    class: "introduction",
  });
}

//Function that picks up the filled in form and pushes all the data to the array,
//after that you get redirected to the next step
function submit(req, res) {
  users.push({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    lookingfor: req.body.preferredgender,
  });

  res.redirect("/steps");
}

//Function that renders a page with the specific
function getUser(req, res, next) {
  var firstname = req.params.firstname;
  var user = find(users, function (value) {
    return value.firstname === firstname;
  });

  if (!user) {
    next();
    return;
  }

  res.render("profile.ejs", { data: user, page: "Profile" });
}
