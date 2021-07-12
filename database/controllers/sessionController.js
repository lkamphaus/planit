const { Session } = require('../models/sessionSchema.js');

const fetchSession = (session_id) => {
  return new Promise((resolve, reject) => {
    Session.find({}).where('session_id').equals(session_id)
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

const deleteSession = (sessionId) => {
  return new Promise((resolve, reject) => {
    Session.deleteOne({}).where('_id').equals(session_id)
    .then((res) => {
      resolve(res);
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
}