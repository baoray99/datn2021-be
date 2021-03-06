const Course = require('../models/course');
const User = require('../models/user');
const Lesson = require('../models/lesson');
const mongoose = require('mongoose');

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
      .populate('lessons')
      .then((course) => {
        res.status(200).json(course);
      })
      .catch(next);
  }
  //Get popular course
  getPopularCourse(req, res, next) {
    const query = {};
    // sort in descending (-1) order by length
    const sort = { total_member: -1 };
    const limit = 10;
    Course.find(query)
      .sort(sort)
      .limit(limit)
      .then((courses) => {
        res.status(200).json(courses);
      })
      .catch(next);
  }
  //POST a new Course
  createCourse(req, res, next) {
    const newCourse = new Course({
      _id: new mongoose.Types.ObjectId(),
      user_id: req.body.user_id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    });
    newCourse
      .save()
      .then((course) => {
        User.findByIdAndUpdate(
          req.body.user_id,
          {
            $push: {
              teaching_courses: course,
            },
          },
          { returnOriginal: false },
          (err, doc) => {}
        );
        res.status(200).json(course);
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
        Lesson.deleteMany({ course_id: req.params._id }, (err, doc) => {});
        res.status(200).json({ message: 'Delete Course successfully!' });
      })
      .catch(next);
  }
}
module.exports = new CourseController();
