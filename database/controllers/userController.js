const { User } = require('../models/userSchema.js');

const fetchUser = (email) => {
  return new Promise((resolve, reject) => {
    User.find({}).where('email').equals(email)
    .then((response) => {
      resolve(response);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

const addUser = (user) => {
  return new Promise((resolve, reject) => {
    User.create(user)
    .then((response) => {
      resolve(response)
    }).catch((err) => {
      console.error(err);
    });
  })
}

module.exports = {
  fetchUser,
  addUser,
}