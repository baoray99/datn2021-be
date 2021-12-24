const express = require('express');
const router = express.Router();
const personController = require('../app/controllers/person-controller');

router.post('/', personController.createNewPerson);
router.put('/:id', personController.updatePerson);
router.get('/:_id', personController.getStoriesByPerson);
router.get('/', personController.getAllPerson);

module.exports = router;
