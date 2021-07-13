const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { fetchUser } = require('../../database/controllers/userController.js');
const { Session } = require('../../database/models/sessionSchema');

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
    console.log('login req')
    console.log(email, password);
    fetchUser({property: "email", value: email})
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
  console.log(req);
  console.log(user);

  const session = Session({

  })
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;