const express = require('express');
const loginRouter = express.Router();
const passport = require('../middleware/').login;
const nextServer = require('../app.js');
const {addUser} = require('../../database/controllers/userController');

loginRouter.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

loginRouter.get('/home', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
});

loginRouter.get('/login', (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('got with user - redirecting');
    res.nextRender('/home');
  } else {
    next();
  }
})

loginRouter.post('/login',
passport.authenticate('local'), (req, res) => {
  // res.status(200).send('/home');
  res.redirect('/home')
});

loginRouter.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('name');
  res.clearCookie('email');
  res.redirect('/login');
});

loginRouter.post('/signup', (req, res) => {
  req.body.events = [];
  addUser(req.body)
    .then(mongo => {
      res.redirect('/login');
    })
    .catch(error => {
      res.send('Error adding user.');
    })
});

module.exports.loginRouter = loginRouter;