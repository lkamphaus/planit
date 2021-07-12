const { Event } = require('../models/eventSchema.js');

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
const fetchEvents = async (options = null) => {
  const { count, where } = options || { count: 30 };
  return new Promise((resolve, reject) => {
    Event.find(options ? {
      where: where.property = where.value,
    } : {}).limit(count)
    .then((response) => {
      resolve(response);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

const addEvent = async (event) => {
  return new Promise((resolve, reject) => {
    Event.create(event)
    .then((response) => {
      resolve(response)
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

module.exports = {
  fetchEvents,
  addEvent,
};