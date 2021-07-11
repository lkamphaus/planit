const express = require('express');
const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  res.send('<h1>Login</h1>')
});

loginRouter.post('/', (req, res) => {
  res.sendStatus(201);
})
module.exports.loginRouter = loginRouter;