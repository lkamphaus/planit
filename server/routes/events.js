const express = require('express');
const cloudinary = require('cloudinary').v2;
const { fetchEvents, addEvent, updateEvent } = require('../../database/controllers/eventController');
const eventRouter = express.Router();

require('dotenv').config();


eventRouter.get('/', async (req, res) => {
  let { options } = req.body.options === undefined ?
    req.query :
    req.body;

  options = typeof options === 'string' ?
    JSON.parse(options) :
    options;

  try {
    let eventData = await fetchEvents(options);
    res.status(200).send(eventData);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.put('/', async (req, res) => {
  const { updates } = req.body; // Array of update objects
  try {
    await updateEvent(updates);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.post('/', async (req, res) => {
  const { event } = req.body; // event object

  try {
    let response = await addEvent(req.body, 'tarrinneal@gmail.com');
    // res.send(response);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

eventRouter.post('/photos', (req, res) => {
  const {0: fileData} = req.files
  let confObj = {
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`,
  };
  cloudinary.config(confObj);

  cloudinary.uploader.upload(fileData.tempFilePath, (error, result) => {
    if (error) {
      console.error(err);
      res.sendStatus(400);
    } else {
      const transform = 'w_1050,h_144,c_scale/';
      const insertInd = result.secure_url.indexOf('upload/') + 7;
      const transformedUrl = result.secure_url.slice(0, insertInd) + transform + result.secure_url.slice(insertInd);
      res.send(transformedUrl);
    }
  });
});

module.exports.eventRouter = eventRouter;