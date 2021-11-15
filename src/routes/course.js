const express = require('express');
const courseController = require('../app/controllers/course-controller');
const router = express.Router();

//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng
//course
router.post('/', courseController.createCourse);
router.put('/:_id/rating', courseController.updateRatingOfCourse);
router.put('/:_id/members', courseController.updateMembersOfCourse);
router.put('/:_id', courseController.updateCourse);
router.delete('/:_id', courseController.deleteCourse);
router.get('/?_courseId=', courseController.getLessionsByCourseId);
router.get('/:slug', courseController.getCourseBySlug);
router.get('/', courseController.getAllCourses);

module.exports = router;
