const express = require('express');
const loginRouter = express.Router();
const passport = require('../middleware/').login;

loginRouter.post('/',
passport.authenticate('local'),
 (req, res) => {
  //  console.log(passport);
  const { body, params, data, query } = req;
  console.log('body', body);
  console.log('params', params);
  console.log('data', data);
  console.log('query', query);

  const {email, password} = body;

  res.status(201).send('Success!');
});
module.exports.loginRouter = loginRouter;