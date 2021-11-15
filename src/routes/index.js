const roleRouter = require('./role');
const usersRouter = require('./user');
const coursesRouter = require('./course');
const lessionRouter = require('./lession');

function route(app) {
  app.use('/roles', roleRouter);
  app.use('/users', usersRouter);
  app.use('/courses', coursesRouter);
  app.use('/lessions', lessionRouter);
}
module.exports = route;
