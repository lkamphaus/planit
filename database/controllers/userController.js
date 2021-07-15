const { User } = require('../models/userSchema.js');

//Takes in an options object that allows you to specify what propert and what value you want to search by
/**
 * example:
 * {
 *    property: '_id',
 *    value: '60ecd6fe850cd99c5c552ce4'
 * }
 */
const fetchUser = ({ property, value }) => {
  return new Promise((resolve, reject) => {
    User.find({}).where(property).equals(value)
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
      reject(err);
    });
  })
}

const deleteUser = (email) => {
  return new Promise((resolve, reject) => {
    User.deleteOne({}).where('email').equals(email)
    .then((res) => {
      resolve(res);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

module.exports = {
  fetchUser,
  addUser,
  deleteUser
}