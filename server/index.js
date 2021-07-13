const express = require('express');
const { session, cors, login: passport } = require('./middleware');
const { eventRouter } = require('./routes/events.js');
const { loginRouter } = require('./routes/login.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors.corsPolicy);
app.use(session.sessionParser);
app.use(session.sessionManager);
app.use(passport.initialize());
app.use(passport.session());

app.use('/events', eventRouter);
app.use('/login', loginRouter);

// express.get('/logout', (req, res) => {
//   res.send('<h1>Logout</h1>')
// });

module.exports.app = app;
