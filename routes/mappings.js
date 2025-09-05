const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createMapping, getMappings, getDoctorsForPatient, deleteMapping
} = require('../controllers/mappingController');
const { mappingValidator } = require('../utils/validators');

router.post('/', auth, mappingValidator, createMapping);
router.get('/', auth, getMappings);
router.get('/:patientId', auth, getDoctorsForPatient);
router.delete('/:id', auth, deleteMapping);

module.exports = router;