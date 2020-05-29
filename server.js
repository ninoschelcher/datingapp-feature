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

const url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST;
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
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_KEY,
  }))
  .set('view engine', 'ejs')
  .post('/', introductionForm)
  .post('/step2form', submitStep2)
  .post('/step3form', submitStep3)
  .post('/step4form', submitStep4)
  .post('/step5form', submitStep5)
  .post('/updateuser', updateUserProfile)
  .get('/step2/:id', loadStep2)
  .get('/step3/:id', loadStep3)
  .get('/step4/:id', loadStep4)
  .get('/step5/:id', loadStep5)
  .get('/', introduction)
  .get('/profile/:id', getUserProfile)
  .use((req, res) => {
    res.status(404).send('404 Page not found');
  })
  .listen(port);


// Render the introduction page
function introduction(req, res) {
  res.render('introduction.ejs', {
    page: 'Introduction',
    class: 'introduction',
  });
}

/* Function that sends the data filled in by the user to mongodb */
function introductionForm(req, res) {
  req.session.user = {
    id: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    preferredgender: req.body.preferredgender,
  };
  res.redirect('/step2/' + req.body.username);
}


/* First ejs test for the process of telling more about your goals and interest */
function loadStep2(req, res) {
  res.render('step2.ejs', {
    page: 'Step 2',
    user: req.session.user,
  });
}

function submitStep2(req, res, next) {
  req.session.user.dogname = req.body.dogname;
  req.session.user.dogpicture = req.body.dogpicture;
  res.redirect('/step3/' + req.session.user.id);
}

function loadStep3(req, res) {
  res.render('step3.ejs', {
    page: 'Step 3',
    user: req.session.user,
  });
}

function submitStep3(req, res, next) {
  res.redirect('/step4/' + req.session.user.id);
}

function loadStep4(req, res) {
  res.render('step4.ejs', {
    page: 'Step 4',
    user: req.session.user,
  });
}

function submitStep4(req, res, next) {
  res.redirect('/step5/' + req.session.user.id);
}

function loadStep5(req, res) {
  res.render('step5.ejs', {
    page: 'Step 5',
    user: req.session.user,
  });
}

function submitStep5(req, res, next) {
  db.collection('users').insertOne(req.session.user, profileRedirect);

  function profileRedirect(err, data) {
    if (err) {
      next(err);
    } else {
      req.session.user._id = data.insertedId;
      res.redirect('/profile/' + req.session.user._id);
    }
  }
}

// Function that renders a page with the specific profile of a specific user
function getUserProfile(req, res, next) {
  db.collection('users').findOne({
    _id: new mongo.ObjectID(req.params),
  }, showProfile);

  function showProfile(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('profile.ejs', { user: data, page: 'Profile' });
    }
  }
}

/* Function that updates the fields from the profile page */
function updateUserProfile(req, res, next) {
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

  function updatePage(err) {
    if (err) {
      next(err);
    } else {
      res.redirect('/' + req.body._id);
    }
  }
}
