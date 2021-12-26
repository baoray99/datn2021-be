const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/auth-controller');

//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/unregister-course', authController.getPopularCourseWithLogin);
router.put('/', authController.updateRegisteredCourses);
router.put('/:_id', authController.updateUser);
router.delete('/:_id', authController.deleteUser);
router.get('/me', authController.getMe);
router.get('/teaching-course', authController.getTeachingCourse);
router.get('/registered-course', authController.getRegisteredCourse);
router.get('/:_id', authController.getUserById);
router.get('/', authController.getAllUsers);

module.exports = router;
