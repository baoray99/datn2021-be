const Story = require('../models/story');
const Person = require('../models/person');
const mongoose = require('mongoose');

class StoryController {
  createNewStory(req, res, next) {
    const newStory = new Story({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      author: req.body.authorId, // gián giá trị _id cho person
    });
    newStory
      .save()
      .then((story) => {
        Person.findByIdAndUpdate(
          req.body.authorId,
          {
            $push: {
              stories: story,
            },
          },
          { returnOriginal: false },
          (err, doc) => {
            console.log(doc);
          }
        );
        res.status(200).json('create success');
      })
      .catch(next);
  }
  //find stroy
  findStoryAndAuthor(req, res, next) {
    Story.findOne({ title: req.body.title })
      .populate('author')
      .then((story) => {
        res.status(200).json(story);
      })
      .catch(next);
  }
}
module.exports = new StoryController();
