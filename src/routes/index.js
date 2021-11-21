const roleRouter = require('./role');
const authRouter = require('./auth');
const coursesRouter = require('./course');
const lessionRouter = require('./lession');
const commentRouter = require('./comment');

function route(app) {
  app.use('/roles', roleRouter);
  app.use('/users', authRouter);
  app.use('/courses', coursesRouter);
  app.use('/lessions', lessionRouter);
  app.use('/comments', commentRouter);
}
module.exports = route;
