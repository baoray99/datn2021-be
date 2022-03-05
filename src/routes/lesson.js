const express = require('express');
const lessonController = require('../app/controllers/lesson-controller');
const router = express.Router();
const auth = require('../app/middleware/auth');

//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng

router.post('/', lessonController.createLesson);
router.put('/:_id', lessonController.updateLesson);
router.delete('/:_id', lessonController.deleteLesson);
router.get('/:_id', lessonController.getLessonById);
router.get('/', lessonController.getAllLessons);

module.exports = router;
