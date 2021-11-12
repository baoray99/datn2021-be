const roleRouter = require('./role');
const usersRouter = require('./user');
const coursesRouter = require('./course');

function route(app) {
  app.use('/roles', roleRouter);
  app.use('/users', usersRouter);
  app.use('/courses', coursesRouter);
}
module.exports = route;
