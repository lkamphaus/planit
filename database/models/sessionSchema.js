const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  session_id: {
    type: String,
    unique: true,
  },
  user: String,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports.Session = Session;