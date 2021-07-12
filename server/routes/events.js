const express = require('express');
const eventRouter = express.Router();

eventRouter.get('/', (req, res) => {
  res.send('<h1>Event</h1>')
});

eventRouter.post('/', (req, res) => {
  res.sendStatus(201);
})

module.exports.eventRouter = eventRouter;