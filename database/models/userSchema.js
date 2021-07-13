const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  events: [],
<<<<<<< Updated upstream
  password: String,
=======
  password: String
>>>>>>> Stashed changes
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;