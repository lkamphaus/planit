const express = require('express');
const { fetchEvents, addEvent } = require('../../database/controllers/eventController');
const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
  const { options } = req.body;
  try {
    let eventData = await options === undefined ? fetchEvents() : fetchEvents(options);
    res.status(200).send(eventData);
  } catch(err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.put('/', async (req, res) => {
  res.sendStatus(201);
})

eventRouter.post('/', async (req, res) => {
  const { event } = req.body;
  try {
    await addEvent(event);
    res.sendStatus(201);
  } catch(err) {
    console.error(err);
    res.sendStatus(400);
  }
})

module.exports.eventRouter = eventRouter;