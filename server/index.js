const express = require('express');
const { eventRouter } = require('./routes/events.js');
const { loginRouter } = require('./routes/login.js');

const app = express();


<<<<<<< HEAD
const initRoutes = (httpServer) => {
  httpServer.use('/events', eventRouter);
  httpServer.use('/', loginRouter);
};
=======
app.use('/api/events', eventRouter);
app.use('/', loginRouter);
>>>>>>> main

// express.get('/logout', (req, res) => {
//   res.send('<h1>Logout</h1>')
// });

module.exports.app = app;
module.exports.initRoutes = initRoutes;
