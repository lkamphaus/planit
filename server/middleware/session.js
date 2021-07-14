const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const sessions = {};

const sessionParser = session({
  secret: 'ivanswrld',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000
  }
});

const sessionManager = (req, res, next) => {
  let { user } = req.session;
  const loggedIn = !!user;

  res.cookie('logged-in', loggedIn)
  console.log(user);
  if (loggedIn) {
    const { email, name } = user;
    res.cookie('name', name);
    res.cookie('email', email);
  }

  next();
}

module.exports.sessionParser = sessionParser;
module.exports.sessionManager = sessionManager;