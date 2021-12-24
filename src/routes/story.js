const express = require('express');
const router = express.Router();
const storyController = require('../app/controllers/story-controller');

router.post('/', storyController.createNewStory);
router.post('/find', storyController.findStoryAndAuthor);

module.exports = router;
