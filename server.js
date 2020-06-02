/* Express Setup */
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const find = require('array-find');
const mongo = require('mongodb');
const session = require('express-session');
const multer = require('multer');
const { ObjectID } = require('mongodb');
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

var imgUploads = multer({dest: 'public/uploads/'})

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
  .post('/step2form', imgUploads.single('dogpicture'),  submitStep2)
  .post('/step3form', submitStep3)
  .post('/step4form', submitStep4)
  .post('/step5form', imgUploads.single('profilepicture'), submitStep5)
  .post('/updateuser',imgUploads.single('profilepicture'), updateUserProfile)
  .post('/signout', signOutUser)
  .post('/disableprofile', disableProfile)
  .get('/', introduction)
  .get('/step2/:id', loadStep2)
  .get('/step3/:id', loadStep3)
  .get('/step4/:id', loadStep4)
  .get('/step5/:id', loadStep5)
  .get('/profile/:id', getUserProfile)
  .get('/preview/:id', previewUserProfile)
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


// All functions that process the inputs of each step and puts the input into the current session //
function loadStep2(req, res) {
  res.render('step2.ejs', {
    page: 'Step 2',
    user: req.session.user,
  });
}

function submitStep2(req, res) {
  req.session.user.dogname = req.body.dogname;
  req.session.user.dogpicture = req.file ? req.file.filename : null;

  res.redirect('/step3/' + req.session.user.id);
}

function loadStep3(req, res) {
  res.render('step3.ejs', {
    page: 'Step 3',
    user: req.session.user,
  });
}

function submitStep3(req, res) {
  req.session.user.hobbies = req.body.hobbies
  req.session.user.description = req.body.description;

  res.redirect('/step4/' + req.session.user.id);
}

function loadStep4(req, res) {
  res.render('step4.ejs', {
    page: 'Step 4',
    user: req.session.user,
  });
}

function submitStep4(req, res) {
  req.session.user.dogpref = req.body.dogpref;

  res.redirect('/step5/' + req.session.user.id);
}

function loadStep5(req, res) {
  res.render('step5.ejs', {
    page: 'Step 5',
    user: req.session.user,
  });
}

function submitStep5(req, res, next) {
  req.session.user.profilepic = req.file ? req.file.filename : null;
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

// Function that renders a page with the specific profile of a specific user //
function getUserProfile(req, res, next) {
  db.collection('users').findOne({
    _id: new mongo.ObjectID(req.session.user._id),
  }, showProfile);

  function showProfile(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('profile.ejs', { user: data, page: 'Profile' });
    }
  }
}

// Function that renders a page with how the profile of the current user looks like with all the data filled in //
function previewUserProfile(req, res, next) {
  db.collection('users').findOne({
    _id: new mongo.ObjectID(req.session.user._id),
  }, showPreview);

  function showPreview(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('previewprofile.ejs', { user: data, page: 'Profile Preview' });
    }
  }
}

// Function that updates the fields from the profile page //
function updateUserProfile(req, res, next) {
  db.collection('users').updateOne({ _id: ObjectID(req.body._id) },
    {
      $set: {
        id: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender,
        profilepic: req.file ? req.file.filename : null,
        preferredgender: req.body.preferredgender,
        description: req.body.description,
        hobbies: req.body.hobbies,
        dogname: req.body.dogname,
      },
    }, updateUser);

  function updateUser(err) {
    if (err) {
      next(err);
    } else {
      res.redirect('/profile/' + req.body._id);
    }
  }
}

// Function that deletes the current profile from the database //
function disableProfile(req, res) {
  db.collection('users').deleteOne( { _id : new mongo.ObjectId(req.body._id) }, 
  deleteUser);

  function deleteUser(err) {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  }
}

// Function that signs out the user //
function signOutUser(req, res) {
  req.session.destroy();
  res.redirect('/')
}

