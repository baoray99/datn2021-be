const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/user-controller');

//nên đưa path trống / xuống dưới cùng để ko bị ăn function tương ứng
router.post('/', userController.createUser);
router.put('/:_id', userController.updateUser);
router.delete('/:_id', userController.deleteUser);
router.get('/:_id', userController.getUserById);
router.get('/:roleId', userController.getUsersByRoleId);
router.get('/', userController.getAllUsers);

module.exports = router;
