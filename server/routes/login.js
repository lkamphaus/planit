const express = require('express');
const loginRouter = express.Router();
const passport = require('../middleware/').login;

loginRouter.get('/login', (req, res, next) => {
  if (req.user) {
    console.log('got with user - redirecting');
    res.redirect('/home');
  } else {
    next();
  }
})

loginRouter.post('/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));

module.exports.loginRouter = loginRouter;