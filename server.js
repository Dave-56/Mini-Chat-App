const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  //   console.log('a user connected');

  //create helper function to send status
  const sendStatus = (s) => {
    socket.emit('status', s);
  };
  socket.on('input', (data) => {
    let name = data.name;
    let message = data.message;

    //send status error
    if (!name || !message) {
      sendStatus('Please enter a name and message');
    }
    io.emit('chat message', [data]);

    //send status object
    sendStatus({
      message: 'Message sent',
    });

    // io.emit('chat message', msg);
  });
});

http.listen(3000, () => console.log('Server started on *:3000'));
