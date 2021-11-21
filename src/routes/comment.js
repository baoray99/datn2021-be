const express = require('express');
const commentController = require('../app/controllers/comment-controller');
const router = express.Router();
const auth = require('../app/middleware/auth');
//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng
//course
router.post('/', commentController.createComment);
router.put('/:_id', commentController.updateComment);
router.delete('/:_id', commentController.deleteComment);

module.exports = router;
