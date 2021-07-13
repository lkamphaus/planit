const express = require('express');
const loginRouter = express.Router();
const passport = require('../middleware/').login;

loginRouter.get('/login', (req, res, next) => {
  if (req.user) {
    console.log('got with user - redirecting');
    redirect('/');
  } else {
    next();
  }
})

loginRouter.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }),
  (req, res) => {
    const { body, params, data, query } = req;
    res.status(201).send('Authorization successful.');
});
module.exports.loginRouter = loginRouter;