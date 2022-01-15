const express = require('express');
const router = express.Router();
const recController = require('../app/controllers/recommend-controller');
router.post('/', recController.recCourse);
module.exports = router;
