const db = require('./index.js');
const { Event } = require('./models/eventSchema.js');
const { fetchEvents, addEvent } = require('./controllers/eventController.js');

const mockEvent = {
  name: 'Tarvent',
  description: 'Hey everybody come to my event, it\'s going to be lit!',
  owner: 'Tarrin',
  location: 'Tarrin\'s house',
  duration: 7200,
  status: 'pending',
  time: null,
  window: {
    start: '2021-07-10T22:41:02.552Z',
    end: '2021-07-17T22:41:02.552Z',
  },
  rsvps: [
    {
      name: 'Philbert',
      availability: [
        {
          start: '2021-07-10T22:30:00.002Z',
          end: '2021-07-11T00:30:00.002Z',
        },
        {
          start: '2021-07-10T02:00:00.002Z',
          end: '2021-07-10T04:00:00.002Z',
        },
        {
          start: '2021-07-10T21:00:00.002Z',
          end: '2021-07-11T02:30:00.002Z',
        },
        {
          start: '2021-07-12T04:00:00.002Z',
          end: '2021-07-12T10:00:00.002Z',
        },
        {
          start: '2021-07-15T06:30:00.002Z',
          end: '2021-07-15T10:30:00.002Z',
        },
        {
          start: '2021-07-16T10:00:00.002Z',
          end: '2021-07-16T12:00:00.002Z',
        },
      ],
    },
    {
      name: 'Shrek',
      availability: [
        {
          start: '2021-07-10T23:00:00.002Z',
          end: '2021-07-11T02:00:00.002Z',
        },
        {
          start: '2021-07-10T03:00:00.002Z',
          end: '2021-07-10T06:00:00.002Z',
        },
        {
          start: '2021-07-10T23:00:00.002Z',
          end: '2021-07-11T06:00:00.002Z',
        },
        {
          start: '2021-07-12T04:30:00.002Z',
          end: '2021-07-12T10:00:00.002Z',
        },
        {
          start: '2021-07-14T04:00:00.002Z',
          end: '2021-07-15T10:30:00.002Z',
        },
        {
          start: '2021-07-16T08:00:00.002Z',
          end: '2021-07-16T10:30:00.002Z',
        },
      ],
    },
  ]
}

const seed = async () => {
  try {
    // await(addEvent(mockEvent));
    // console.log('Event added successfully');
    let events = await fetchEvents({ where: { property: 'name', value: 'Tarvent'}, count: 1});
    console.log(events);
  } catch(err) {
    console.error('Seed Failed', err);
  }
}
seed();