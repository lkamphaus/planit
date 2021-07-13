const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { fetchUser } = require('../../database/controllers/userController.js');
const { deleteSession, addSession } = require('../../database/controllers/sessionController.js')
const { Session } = require('../../database/models/sessionSchema');

const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render('/login');
  }
};

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
    fetchUser({property: 'email', value: email})
      .then((mongoResult) => {
        const user = mongoResult[0];
        console.log(user);
        if (!user) {
          return done(null, false, {message: "Unable to find email. Please check spelling, or sign up."});
        } else {
          if (user.password !== password) {
            return done(null, false, {message: "Password incorrect for " + email});
          } else {
            return done(null, user);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        return done(error);
      });
  }
));

passport.serializeUser(function(req, user, done) {
  const { email } = user;
  const session = Session({
    email
  });
  addSession(session)
    .then(() => {
      done(null, email);
    })
    .catch(error => {
      console.error(error);
      done(error, email);
    });
});

passport.deserializeUser(function(email, done) {
  fetchUser({property: 'email', value: email})
    .then(mongoResponse => {
      const user = mongoResponse[0];
      deleteSession(email)
      .then(() => {
        done(null, user);
      });
    })
    .catch(error => {
      console.log(error);
      done(error, email);
    });
});

module.exports = passport;