const Lession = require('../models/lession');
const Course = require('../models/course');
class LessionController {
  //GET all Lessions
  getAllLessions(req, res, next) {
    Lession.find()
      .then((lessions) => {
        res.status(200).json(lessions);
      })
      .catch(next);
  }
  //GET Lession by Id
  getLessionById(req, res, next) {
    Lession.findById({ _id: req.params._id })
      .then((lession) => {
        res.status(200).json(lession);
      })
      .catch(next);
  }
  //GET Lessions by CourseId
  getLessionsByCourseId(req, res, next) {
    Lession.find({ belongToId: req.query.courseId })
      .then((lessions) => {
        res.status(200).json(lessions);
      })
      .catch(next);
  }
  //POST new Lession
  createLession(req, res, next) {
    const course = {};
    Course.findById({ _id: req.body.belongToId })
      .select('name desctiption')
      .then((course) => {
        course = course;
        const newLession = new Lession({
          belongToId: req.body.belongToId,
          belongTo: course,
          name: req.body.name,
          videoLink: req.body.videoLink,
        });
        newLession
          .save()
          .then((lession) => {
            res.status(200).json(lession);
          })
          .catch(next);
      })
      .catch(next);
  }
  //PUT Lession
  updateLession(req, res, next) {
    Lession.updateOne(
      { _id: req.params._id },
      {
        $set: {
          name: req.body.name,
          videoLink: req.body.videoLink,
        },
      }
    )
      .then((lession) => {
        res.status(200).json(lession);
      })
      .catch(next);
  }
  //DELETE Lession
  deleteLession(req, res, next) {
    Lession.deleteOne({ _id: req.params._id })
      .then(() => {
        res.status(200).json({ message: 'Delete Lession successfully!' });
      })
      .catch(next);
  }
}
module.exports = new LessionController();
