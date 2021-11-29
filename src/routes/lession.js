const express = require('express');
const lessionController = require('../app/controllers/lession-controller');
const router = express.Router();
const auth = require('../app/middleware/auth');
const lession = require('../app/models/lession');

//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng

router.post('/', lessionController.createLession);
router.put('/:_id', lessionController.updateLession);
router.delete('/:_id', lessionController.deleteLession);
router.get('/:_id', lessionController.getLessionById);
router.get('/', lessionController.getLessionsByCourseId);
router.get('/', lessionController.getAllLessions);

module.exports = router;
