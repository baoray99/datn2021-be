const Course = require('../models/course');
const User = require('../models/user');
const Lession = require('../models/lession');

class CourseController {
  //GET all Courses
  getAllCourses(req, res, next) {
    Course.find()
      .then((courses) => {
        res.status(200).json(courses);
      })
      .catch(next);
  }
  //GET Course by Id
  getCourseById(req, res, next) {
    Course.findById({ _id: req.params._id })
      .then((course) => {
        res.status(200).json(course);
      })
      .catch(next);
  }
  //GET Course by slug
  getCourseBySlug(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.status(200).json(course);
      })
      .catch(next);
  }
  //POST a new Course
  createCourse(req, res, next) {
    const user = {};
    User.findById({ _id: req.body.belongToId })
      .select(
        'name birthday gender avatar bio phone facebook instagram youtube'
      )
      .then((user) => {
        user = user;
        const newCourse = new Course({
          belongToId: req.body.belongToId,
          belongTo: user,
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
        });
        newCourse
          .save()
          .then((course) => {
            res.status(200).json(course);
          })
          .catch(next);
      })
      .catch(next);
  }
  //PUT Course
  updateCourse(req, res, next) {
    Course.updateOne(
      { _id: req.params._id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
        },
      }
    )
      .then((course) => {
        res.status(200).json(course);
      })
      .catch(next);
  }
  //PUT rating of Course
  updateRatingOfCourse(req, res, next) {
    Course.updateOne(
      { _id: req.params._id },
      {
        $set: {
          rating: req.body.rating,
        },
      }
    )
      .then((course) => {
        res.status(200).json(course);
      })
      .catch(next);
  }
  //DELETE Course
  deleteCourse(req, res, next) {
    Course.deleteOne({ _id: req.params._id })
      .then(() => {
        res.status(200).json({ message: 'Delete Course successfully!' });
      })
      .catch(next);
  }
}
module.exports = new CourseController();
