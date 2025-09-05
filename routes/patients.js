const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createPatient, getPatients, getPatientById, updatePatient, deletePatient
} = require('../controllers/patientController');
const { patientValidator } = require('../utils/validators');


router.post('/', auth, patientValidator, createPatient);
router.get('/', auth, getPatients);
router.get('/:id', auth, getPatientById);
router.put('/:id', auth, updatePatient);
router.delete('/:id', auth, deletePatient);

module.exports = router;