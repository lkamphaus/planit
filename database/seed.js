const db = require('./index.js');
const { fetchEvents, addEvent, deleteAllEvents } = require('./controllers/eventController.js');
const { addUser, fetchUser, deleteUser } = require('./controllers/userController.js');
const { addSession, fetchSession, deleteSession, deleteAllSessions } = require('./controllers/sessionController.js');

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

const mockUser = {
  name: 'Tarrin',
  email: 'tarrinneal@gmail.com',
  events: [],
  password: 'bargle'
}

const mockSession = {
  session_id: '1',
  user: '60ec9ccf28c54f891c97b28d'
}

const seed = async () => {
  try {
    await deleteAllEvents();
    console.log('Events Deleted');
    await deleteAllSessions();
    console.log('Sessions Deleted');
    await deleteUser('tarrinneal@gmail.com');
    console.log('User deleted');
    await addUser(mockUser);
    console.log('User added successfully');
    let user = await fetchUser({ property: 'email', value: 'tarrinneal@gmail.com'});
    await addEvent(mockEvent, user[0]._id);
    let userbyId = await fetchUser({ property: '_id', value: user[0]._id});
    // console.log(userbyId)
    // console.log('Event added successfully');
    // let events = await fetchEvents({ where: { property: 'name', value: 'Tarvent'}, count: 1});
    // console.log(events);
    // await addSession(mockSession);
    // console.log('Session added');
    // let session = await fetchSession('1');
    // console.log(session);
  } catch(err) {
    console.error('Seed Failed', err);
  } finally {
    console.info('Seeded db successfully. Gracefully exiting.');
    process.exit(0);
  }
}
seed();