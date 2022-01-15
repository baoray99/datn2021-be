const spawn = require('child_process').spawn;
const path = require('path');

class RecommendController {
  recCourse(req, res, next) {
    const recommend = spawn('python', [
      path.resolve('src/app/controllers/recommend.py'),
      req.body.courseName,
    ]);
    recommend.stdout.on('data', (data) => {
      if (data.toString() !== '') {
        res.status(200).json(JSON.parse(data.toString()));
      } else {
        res.status(503).json({ error: 'no relate course' });
      }
      // console.log(data.toString());
    });
  }
}
module.exports = new RecommendController();
