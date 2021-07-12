const express = require('express');

const { eventRouter } = require('./routes/events.js');
const { loginRouter } = require('./routes/login.js');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// express.use('/events', eventRouter);
// express.use('/login', loginRouter);

// express.get('/logout', (req, res) => {
//   res.send('<h1>Logout</h1>')
// });

module.exports.app = app;
