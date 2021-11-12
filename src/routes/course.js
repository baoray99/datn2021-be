const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/course-controller');

//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng
router.post('/', coursesController.createCourse);
router.put('/:_id/rating', coursesController.updateRatingOfCourse);
router.put('/:_id/members', coursesController.updateMembersOfCourse);
router.delete('/:_id', coursesController.deleteCourse);
router.get('/:slug', coursesController.getCourseBySlug);
router.put('/:_id', coursesController.updateCourse);
router.get('/', coursesController.getAllCourses);
module.exports = router;
