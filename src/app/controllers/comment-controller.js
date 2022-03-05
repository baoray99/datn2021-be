const Lesson = require('../models/lesson');
const User = require('../models/user');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
class CommentController {
  //GET comment by lessionId
  getCommentsByLessonId(req, res, next) {
    Comment.find({ lesson_id: req.query.lesson_id })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch(next);
  }
  //POST new comment
  createComment(req, res, next) {
    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      user_id: req.body.userId,
      lesson_id: req.body.lesson_id,
      content: req.body.content,
    });
    newComment
      .save()
      .then((comment) => {
        User.findByIdAndUpdate(
          req.body.user_id,
          {
            $push: {
              comments: comment,
            },
          },
          { returnOriginal: false },
          (err, doc) => {}
        );
        Lession.findByIdAndUpdate(
          req.body.lesson_id,
          {
            $push: {
              comments: comment,
            },
          },
          { returnOriginal: false },
          (err, doc) => {}
        );
        res.status(200).json('Create comment successfully!');
      })
      .catch(next);
  }
  //PUT comment
  updateComment(req, res, next) {
    Comment.updateOne(
      { _id: req.params._id },
      {
        $set: {
          content: req.body.content,
        },
      }
    )
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch(next);
  }
  //DELETE comment
  deleteComment(req, res, next) {
    Comment.deleteOne({ _id: req.params._id })
      .then(() => {
        res.status(200).json({ message: 'Delete comment successfully!' });
      })
      .catch(next);
  }
}
module.exports = new CommentController();
