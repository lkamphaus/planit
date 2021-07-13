const express = require('express');
const { fetchEvents, addEvent, updateEvent } = require('../../database/controllers/eventController');
const eventRouter = express.Router();

eventRouter.get('/', async (req, res) => {
  const { options } = req.body; // object
  try {
    let eventData = await options === undefined ? fetchEvents() : fetchEvents(options);
    res.status(200).send(eventData);
  } catch(err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.put('/', async (req, res) => {
  const { updates } = req.body; // Array of update objects
  try {
    await updateEvent(updates);
    res.sendStatus(201);
  } catch(err) {
    console.error(err);
    res.sendStatus(400);
  }
})

eventRouter.post('/', async (req, res) => {
  const { event } = req.body; // event object
  try {
    await addEvent(event, req.user.email);
    res.sendStatus(201);
  } catch(err) {
    console.error(err);
    res.sendStatus(400);
  }
})

module.exports.eventRouter = eventRouter;