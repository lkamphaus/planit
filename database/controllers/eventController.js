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

const fetchEvents = async (options = { count: 30, where: null }) => {
  const { count, where } = options;
  if (where) {
    try{
      const { property, value } = where;
      let data = await Event.find({}).where(property).equals(value).limit(count);
      return data;
    } catch(err) {
      console.error(err);
      throw err;
    }
  } else {
    try {
      let data = await Event.find({}).limit(count);
      return data;
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
}

const addEvent = async (event, email) => {
  try {
    const { _id } = await Event.create(event);
    const whereParam = { email };
    const whatParam = { $push: { events: _id }};
    await User.updateOne(whereParam, whatParam);
    return {
      message: "Event Added",
      event_id: _id
    }
  } catch(err) {
    console.error(err);
    throw err;
  }
}

const deleteAllEvents = async () => {
  try {
    await Event.deleteMany({});
    return {
      message: "Events Deleted"
    }
  } catch(err) {
    console.error(err);
    throw err;
  }
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

const updateEvent = async (updateArr) => {
  try{
    await Promise.all(updateArr.map(async (update) => {
      try {
        let { what, where } = update;
        let whereParam = {};
        whereParam[where.property] = where.value;
        let whatParam = {};
        whatParam[what.method] = {};
        whatParam[what.method][what.field] = what.value;
        let res = await Event.updateOne(whereParam, whatParam);
      } catch(err) {
        console.error(err);
        throw err;
      }
    }))
    return {
      message: "all updates complete"
    }
  } catch(err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  fetchEvents,
  addEvent,
  deleteAllEvents,
  updateEvent,
};