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

//This will take in an array of options objects, and do all of the updates asynchronously
/*
  [
    {
      where: {
        property: 'some_property',
        value: 'some_value'
      },
      what: {
        method: '$set', <-- $push will probably be what you want for adding new availability
        field: 'some_field <-- ie. name || email || rsvps'
        value: 'New_Value'
      }

    }
  ]
*/
const updateEvent = (updateArr) => {
  return new Promise((resolve, reject) => {
    const promiseArray = [];
    for (let i = 0; i < updateArr.length; i++) {
      let { where, what } = updateArr[i];
      let whereParam = {};
      whereParam[where.property] = where.value;
      let whatParam = {};
      whatParam[what.method] = {};
      whatParam[what.method][what.field] = what.value;
      let currentPromise = new Promise((resolve, reject) => {
        Event.updateOne(whereParam, )
        .then((res) => {
          resolve(res);
        }).catch((err) => {
          console.error(err);
          reject(err);
        })
      })
      promiseArray.push(currentPromise);
    }
    Promise.all(promiseArray)
    .then((res) => {
      resolve(res);
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
  updateEvent,
};