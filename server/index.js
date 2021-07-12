const express = require('express');

const { eventRouter } = require('./routes/events.js');
const { loginRouter } = require('./routes/login.js');

// express.use('/events', eventRouter);
// express.use('/login', loginRouter);

// express.get('/logout', (req, res) => {
//   res.send('<h1>Logout</h1>')
// });

module.exports.app = express();
