const Course = require('../models/course');
class CourseController {
  //GET all Courses
  getAllCourses(req, res, next) {
    Course.find()
      .then((courses) => {
        res.json(courses);
      })
      .catch(next);
  }
  //GET Course by slug
  getCourseBySlug(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.json(course);
      })
      .catch(next);
  }
  //POST a new Course
  createCourse(req, res, next) {
    const newCourse = new Course({
      belongToId: req.body.belongToId,
      belongTo: req.body.belongTo,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    });
    newCourse
      .save()
      .then((course) => {
        res.json({ message: 'Created new Course successfully!' }, course);
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
        res.json({ message: 'Updated Course successfully!' }, course);
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
        res.json({ message: 'Update rating of Course successfully!' }, course);
      })
      .catch(next);
  }
  //PUT members of Course
  updateMembersOfCourse(req, res, next) {
    Course.updateOne(
      { _id: req.params._id },
      {
        $set: {
          members: req.body.members,
        },
      }
    )
      .then((course) => {
        res.json({ message: 'Update members of Course successfully!' }, course);
      })
      .catch(next);
  }
  //DELETE Course
  deleteCourse(req, res, next) {
    Course.deleteOne({ _id: req.params._id })
      .then(() => {
        res.json({ message: 'Delete Course successfully!' });
      })
      .catch(next);
  }
}
module.exports = new CourseController();
