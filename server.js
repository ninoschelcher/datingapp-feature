/* eslint-disable prefer-template */
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
const session = require('express-session');
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
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(session({ secret: '4nd912nd891nde82' }))
  .set('view engine', 'ejs')
  .post('/', introductionForm)
  .post('/updateuser', updateUserProfile)
  .get('/step2', loadStep2)
  .get('/introduction', introduction)
  .get('/:id', getUserProfile)
  .use((req, res) => {
    res.status(404).send('404 Page not found');
  })
  .listen(port);

/* First ejs test for the process of telling
more about your goals and interest */
function loadStep2(req, res) {
  res.render('step2.ejs', {
    page: 'Step 2',
    data: answers,
    name: 'Nino',
    class: 'steps',
  });
}

// Render the introduction page
function introduction(req, res, data) {
  req.session.name = data._id;
  res.render('introduction.ejs', {
    page: 'Introduction',
    class: 'introduction',
  });
}

/* Function that sends the data filled in by the user to mongodb */
function introductionForm(req, res, next) {
  db.collection('users').insertOne({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    preferredgender: req.body.preferredgender,
  }, profileRedirect);

  function profileRedirect(err, data) {
    if (err) {
      next(err);
    } else {
      console.log(data.insertedId);
      res.redirect(`/${data.insertedId}`);
    }
  }
}

// Function that renders a page with the specific profile of a specific user
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

/* Function that updates the fields from the profile page */
function updateUserProfile(req, res, next) {
  console.log(req.body._id);
  db.collection('users').updateOne({ _id: ObjectID(req.body._id) },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender,
        preferredgender: req.body.preferredgender,
      },
    }, updatePage);

  function updatePage(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect(`/${req.body._id}`);
    }
  }
}
