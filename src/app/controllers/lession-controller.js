const Lession = require('../models/lession');
const Course = require('../models/course');
const mongoose = require('mongoose');
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
      .populate('comments')
      .then((lession) => {
        res.status(200).json(lession);
      })
      .catch(next);
  }
  //POST new Lession
  createLession(req, res, next) {
    const newLession = new Lession({
      _id: new mongoose.Types.ObjectId(),
      belongTo: req.body.courseId,
      name: req.body.name,
      idVideo: req.body.idVideo,
    });
    newLession
      .save()
      .then((lession) => {
        Course.findByIdAndUpdate(
          req.body.courseId,
          {
            $push: {
              lessions: lession,
            },
          },
          { returnOriginal: false },
          (err, doc) => {}
        );
        res.status(200).json(lession);
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
          idVideo: req.body.idVideo,
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
