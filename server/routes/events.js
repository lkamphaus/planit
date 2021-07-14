const express = require('express');
const cloudinary = require('cloudinary').v2;
const { fetchEvents, addEvent, updateEvent } = require('../../database/controllers/eventController');
const eventRouter = express.Router();
require('dotenv').config();

eventRouter.get('/', async (req, res) => {
  const { options } = req.body; // object
  try {
    let eventData = await fetchEvents(options);
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
});

eventRouter.post('/', async (req, res) => {
  const { event } = req.body; // event object
  try {
    let response = await addEvent(event, 'tarrinneal@gmail.com');
    res.send(response);
  } catch(err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.post('/photos', async (req, res) => {
  const { fileData } = req.body;
  let confObj = {
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`,
  };
  cloudinary.config(confObj);
  cloudinary.uploader.upload(fileData, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(400);
    } else {
      const transform = 'w_400,c_scale/';
      const insertInd = result.url.indexOf('upload/') + 7;
      const transformedUrl = result.url.slice(0, insertInd) + transform + result.url.slice(insertInd);
      res.status(200).send(transformedUrl);
    }
  });
})

module.exports.eventRouter = eventRouter;