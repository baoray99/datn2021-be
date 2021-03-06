const express = require('express');
const courseController = require('../app/controllers/course-controller');
const commentController = require('../app/controllers/comment-controller');
const recommendController = require('../app/controllers/recommend-controller');
const router = express.Router();
const auth = require('../app/middleware/auth');
//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng
//course
router.post('/', courseController.createCourse);
router.post('/recommend', recommendController.recCourse);
router.put('/:_id/rating', courseController.updateRatingOfCourse);
router.put('/:_id', courseController.updateCourse);
router.delete('/:_id', courseController.deleteCourse);
router.get('/popular', courseController.getPopularCourse);
router.get('/:slug/comments', commentController.getCommentsByLessonId);
router.get('/:slug', courseController.getCourseBySlug);
router.get('/id/:_id', courseController.getCourseById);
router.get('/', courseController.getAllCourses);

module.exports = router;
