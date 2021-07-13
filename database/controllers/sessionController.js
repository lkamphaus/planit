const { Session } = require('../models/sessionSchema.js');

const fetchSession = (email) => {
  return new Promise((resolve, reject) => {
    Session.find({}).where('email').equals(email)
    .then((res) => {
      resolve(res);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

const addSession = (session) => {
  return new Promise((resolve, reject) => {
    Session.create(session)
    .then((res) => {
      resolve(res);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

const deleteSession = (email) => {
  return new Promise((resolve, reject) => {
    Session.deleteOne({}).where('email').equals(email)
    .then((res) => {
      resolve(res);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

const deleteAllSessions = async () => {
  return new Promise((resolve, reject) => {
    Session.deleteMany({})
    .then((response) => {
      resolve(response);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

module.exports = {
  fetchSession,
  addSession,
  deleteSession,
  deleteAllSessions
}