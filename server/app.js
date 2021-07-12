const { app } = require('./index.js');
const { eventRouter } = require('./routes/events.js');
const { loginRouter } = require('./routes/login.js');

app.use('/events', eventRouter);
app.use('/login', loginRouter);

app.get('/logout', (req, res) => {
  res.send('<h1>Logout</h1>')
})

app.listen(3000, () => {
  console.log('Listening on localhost:3000');
})