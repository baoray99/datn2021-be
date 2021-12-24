const express = require('express');
const router = express.Router();

const roleController = require('../app/controllers/role-controller');

//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng
router.post('/', roleController.createRole);
router.put('/:_id', roleController.updateRole);
router.delete('/:_id', roleController.deleteRole);
router.get('/', roleController.getUserByRole);
router.get('/all', roleController.getAllRole);
router.get('/:_id', roleController.getRoleById);

module.exports = router;
