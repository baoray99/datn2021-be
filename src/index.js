//access var in.env
require('dotenv').config();

//database
require('./db/db');

//import libs
const express = require('express');
const app = express();
const port = process.env.PORT;
const route = require('./routes');

//Convert to json
app.use(express.json());
//Init route
route(app);

//App run
app.listen(port, () => {
  console.log(`App is listening at port:${port}`);
});
