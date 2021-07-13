const { Event } = require('../models/eventSchema.js');
const { User } = require('../models/userSchema.js');

/*
options = {
  count: number,
  where: { <-- this will only give you the results where the property matches the value
    property: any property,
    value: any value,
  }
}
*/
//passing in no options will give you all of the events limited to 30, that way nothing breaks
const fetchEvents = async (options = { count: 30, where: null }) => {
  const { count, where } = options;
  return new Promise((resolve, reject) => {
      if (where) {
        const { property, value } = where
        Event.find({}).limit(count).where(property).equals(value)
        .then((response) => {
          resolve(response);
        }).catch((err) => {
          console.error(err);
          reject(err);
        })
      } else {
        Event.find({}).limit(count)
        .then((response) => {
          resolve(response);
        }).catch((err) => {
          console.error(err);
          reject(err);
        })
      }
    })
}

const addEvent = async (event, userId) => {
  return new Promise((resolve, reject) => {
    Event.create(event)
    .then(({ _id }) => {
      let condition = { _id: userId };
      User.updateOne(condition, { $push: { events: _id }})
      .then((res) => {
        resolve('Event Added');
      })
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

const deleteAllEvents = async () => {
  return new Promise((resolve, reject) => {
    Event.deleteMany({})
    .then((response) => {
      resolve(response);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

module.exports = {
  fetchEvents,
  addEvent,
  deleteAllEvents,
};