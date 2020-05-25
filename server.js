/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-use-before-define */
/* Express Setup */
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const find = require('array-find');
const mongo = require('mongodb');
const { ObjectID } = require('mongodb');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;

let db;
mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    throw err;
  } else {
    console.log('Lets get this data started');
  }
  db = client.db(process.env.DB_NAME);
});

const answers = [
  'Never, im lazy',
  'Sometimes',
  '2 times a week',
  'Every single day!',
];

/* Express chain routes and other stuff */
app
  .use(express.static(`${__dirname}/public`))
  .use(bodyParser.urlencoded({ extended: true }))
  .set('view engine', 'ejs')
  .get('/steps', steps)
  .get('/introduction', introduction)
  .get('/:id', getUserProfile)
  .post('/', introductionForm)
  .post('/updateuser', updateUserProfile)
  .use((req, res) => {
    res.status(404).send('404 Page not found');
  })
  .listen(port);

/* First ejs test for the process of telling
more about your goals and interest */
function steps(req, res) {
  res.render('steps.ejs', {
    page: 'Step 2',
    data: answers,
    name: 'Nino',
    class: 'steps',
  });
}

// Render the introduction page
function introduction(req, res) {
  res.render('introduction.ejs', {
    page: 'Introduction',
    class: 'introduction',
  });
}

// Function that picks up the filled in form and pushes
// all the data to the array,
// after that you get redirected to the next step


// Function that renders a page with the specific
function getUserProfile(req, res, next) {
  const { id } = req.params;

  db.collection('users').findOne({
    _id: new mongo.ObjectID(id),
  }, showProfile);

  function showProfile(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('profile.ejs', { data: data, page: 'Profile' });
    }
  }
}

function introductionForm(req, res, next) {
  db.collection('users').insertOne({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    lookingfor: req.body.preferredgender,
  }, profileRedirect);

  function profileRedirect(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect(`/${data.insertedId}`);
    }
  }
}

function updateUserProfile(req, res, next) {
  db.collection('users').updateOne({
    _id: ObjectID(req.body._id),
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      lookingfor: req.body.preferredgender,
    },
  }, updatePage);

  function updatePage(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect(`/${data.insertedId}`);
    }
  }
}
