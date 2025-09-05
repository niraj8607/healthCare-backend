const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor
} = require('../controllers/doctorController');
const { doctorValidator } = require('../utils/validators');

router.post('/', auth, doctorValidator, createDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.put('/:id', auth, updateDoctor);
router.delete('/:id', auth, deleteDoctor);

module.exports = router;