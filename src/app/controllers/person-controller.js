const Person = require('../models/person');
const mongoose = require('mongoose');

class PersonController {
  createNewPerson(req, res, next) {
    const newPerson = new Person({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      age: req.body.age,
    });
    newPerson
      .save()
      .then(() => {
        res.status(200).json('create success');
      })
      .catch(next);
  }
  getAllPerson(req, res, next) {
    Person.find()
      .then((persons) => {
        res.status(200).json(persons);
      })
      .catch(next);
  }
  getStoriesByPerson(req, res, next) {
    Person.findOne({ _id: req.params._id })
      .populate({ path: 'stories' })
      .select('stories')
      .then((stories) => {
        res.status(200).json(stories);
      })
      .catch(next);
  }
  updatePerson(req, res, next) {
    Person.updateOne(
      { _id: req.params._id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
        },
      }
    )
      .then(() => {
        res.status(200).json('update success');
      })
      .catch(next);
  }
}
module.exports = new PersonController();
