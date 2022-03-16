const Lesson = require('../models/lesson');
const Course = require('../models/course');
const mongoose = require('mongoose');
const { populate } = require('../models/lesson');
const Comment = require('../models/comment');
class LessonController {
  //GET all Lessons
  getAllLessons(req, res, next) {
    Lesson.find()
      .then((lessons) => {
        res.status(200).json(lessons);
      })
      .catch(next);
  }
  //GET Lesson by Id
  getLessonById(req, res, next) {
    Lesson.findById({ _id: req.params._id })
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name avatar',
        },
      })
      .then((lesson) => {
        res.status(200).json(lesson);
      })
      .catch(next);
  }
  //POST new Lesson
  createLesson(req, res, next) {
    const newLesson = new Lesson({
      _id: new mongoose.Types.ObjectId(),
      course_id: req.body.course_id,
      name: req.body.name,
      video_id: req.body.video_id,
    });
    newLesson
      .save()
      .then((lesson) => {
        Course.findByIdAndUpdate(
          req.body.course_id,
          {
            $push: {
              lessons: lesson,
            },
          },
          { returnOriginal: false },
          (err, doc) => {}
        );
        res.status(200).json(lesson);
      })
      .catch(next);
  }
  //PUT Lesson
  updateLesson(req, res, next) {
    Lesson.updateOne(
      { _id: req.params._id },
      {
        $set: {
          name: req.body.name,
          video_id: req.body.video_id,
        },
      }
    )
      .then((lesson) => {
        res.status(200).json(lesson);
      })
      .catch(next);
  }
  //DELETE Lesson
  deleteLesson(req, res, next) {
    Lesson.deleteOne({ _id: req.params._id })
      .then(() => {
        Comment.deleteMany({ lesson_id: req.params._id }, (err, doc) => {});
        res.status(200).json({ message: 'Delete Lesson successfully!' });
      })
      .catch(next);
  }
}
module.exports = new LessonController();
