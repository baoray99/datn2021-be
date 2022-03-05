const roleRouter = require('./role');
const authRouter = require('./auth');
const coursesRouter = require('./course');
const lessonRouter = require('./lesson');
const commentRouter = require('./comment');
const recRouter = require('./recommend');

function route(app) {
  app.use('/roles', roleRouter);
  app.use('/users', authRouter);
  app.use('/courses', coursesRouter);
  app.use('/lessons', lessonRouter);
  app.use('/comments', commentRouter);
  app.use('/recommend', recRouter);
}
module.exports = route;
