//access variables in.env
require('dotenv').config();

//database
require('./db/db');

//import libs
const express = require('express');
const app = express();
const compression = require('compression');
const cors = require('cors');
const port = process.env.PORT;
const route = require('./routes');
const http = require('http').Server(app);
const io = require('socket.io')(http);

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
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
//App run
app.listen(port, () => {
  console.log(`App is listening at port:${port}`);
});
