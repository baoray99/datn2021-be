//access variables in.env
require('dotenv').config();

//database
require('./db/db');

//import libs
const express = require('express');
const app = require('express')();
const port = process.env.PORT;
const route = require('./routes');

//cors
const cors = require('cors');

//compression
const compression = require('compression');

//socket io
const server = require('http').Server(app);
const io = require('socket.io')(server);

//python
const spawn = require('child_process').spawn;
const path = require('path');

//fix cors
app.use(cors());

//improve performance
app.use(
  compression({
    level: 6, //level càng cao thì nén càng kĩ nhưng sẽ hao bộ nhớ server
    threshold: 100 * 1000, // đơn vị byte => 100k mới compression
    filter: (req, res) => {
      if (req.headers['x-no-compress']) {
        return false;
      }
      return compression.filter(req, res);
    }, // dùng để xem xét phản hồi có cần nén hay ko
  })
);

//Convert to json
app.use(express.json());

//Init route
route(app);

//init socket
io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('user joined');
  });
  socket.on('leave', (data) => {
    socket.leave(data.room);
    socket.broadcast.to(data.room).emit('user left');
  });
  socket.on('message', (data) => {
    
    io.in(data.room).emit('new message', {
      user: data.user,
      message: data.message,
    });
  });
});

//App run
server.listen(port, () => {
  console.log(`App is listening at port:${port}`);
});
