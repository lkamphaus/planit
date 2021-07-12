const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: String,
  description: String,
  owner: String,
  location: String,
  duration: Number,
  status: String,
  time: String,
  window: {
    start: String,
    end: String,
  },
  rsvps: [
    {
      name: String,
      availability: [
        {
          start: String,
          end: String,
        }
      ],
    }
  ]
});

const Event = mongoose.model('Event', eventSchema);

module.exports.Event = Event;