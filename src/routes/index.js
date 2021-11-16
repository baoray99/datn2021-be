const roleRouter = require('./role');
const authRouter = require('./auth');
const coursesRouter = require('./course');
const lessionRouter = require('./lession');

function route(app) {
  app.use('/roles', roleRouter);
  app.use('/users', authRouter);
  app.use('/courses', coursesRouter);
  app.use('/lessions', lessionRouter);
}
module.exports = route;
