/* Express Setup */
const express = require("express");
const app = express();
const port = 3000;

/* Use static folder to serve static files */
app.use(express.static("static"));
app.set("view engine", "ejs");

/* Routes, define the route thats needs to be requested and than send a response*/
app.get("/", (req, res) => res.sendFile("index"));
app.get("/steps", steps);
app.get("/login", (req, res) => res.sendFile(__dirname + "/static/login.html"));
app.get("/step2", (req, res) => res.sendFile(__dirname + "/static/step2.html"));
app.get("/profile", (req, res) =>
  res.sendFile(__dirname + "/static/profile.html")
);

app.get("/profile/:profileId-:name", (req, res) => res.send(req.params));

/* When the route doesnt exist (status 404), send a message with 404 */
app.use(function (req, res, next) {
  res.status(404).send("404 Page not found");
});

/* Tell express to listen to port 3000, this shows in the terminal */
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

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
