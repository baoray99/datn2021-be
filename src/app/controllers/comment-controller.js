const Lession = require('../models/lession');
const User = require('../models/user');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
class CommentController {
  //GET comment by lessionId
  getCommentsByLessionId(req, res, next) {
    Comment.find({ belongToId: req.query.lessionId })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch(next);
  }
  //POST new comment
  // createComment = async (req, res) => {
  //   const user = await User.findById({ _id: req.body.userId }).select(
  //     'name avatar'
  //   );
  //   const lession = await Lession.findById({ _id: req.body.belongToId }).select(
  //     'name'
  //   );
  //   try {
  //     const newComment = await new Comment({
  //       belongToId: req.body.belongToId,
  //       belongTo: lession,
  //       userId: req.body.userId,
  //       user: user,
  //       content: req.body.content,
  //     });
  //     const saveComment = await newComment.save();
  //     res.status(200).json(saveComment);
  //   } catch (error) {
  //     res.json(error);
  //   }
  // };
  //POST new comment
  createComment(req, res, next) {
    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      user: req.body.userId,
      belongTo: req.body.lessionId,
      content: req.body.content,
    });
    newComment
      .save()
      .then((comment) => {
        User.findByIdAndUpdate(
          req.body.userId,
          {
            $push: {
              comments: comment,
            },
          },
          { returnOriginal: false },
          (err, doc) => {}
        );
        Lession.findByIdAndUpdate(
          req.body.lessionId,
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
