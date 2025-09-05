const { validationResult } = require('express-validator');
const Mapping = require('../models/Mapping');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

exports.createMapping = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { patient: patientId, doctor: doctorId } = req.body;

    
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to assign doctors to this patient' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const mapping = new Mapping({
      patient: patientId,
      doctor: doctorId,
      assignedBy: req.user.id
    });

    await mapping.save();
    res.status(201).json(mapping);
  } catch (err) {
   
    if (err.code === 11000) return res.status(400).json({ message: 'This doctor is already assigned to the patient' });
    next(err);
  }
};

exports.getMappings = async (req, res, next) => {
  try {
    const mappings = await Mapping.find()
      .populate('patient', 'name age')
      .populate('doctor', 'name specialization')
      .populate('assignedBy', 'name email')
      .sort({ assignedAt: -1 });
    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

exports.getDoctorsForPatient = async (req, res, next) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    // ensure owner
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view mappings for this patient' });
    }

    const mappings = await Mapping.find({ patient: patientId }).populate('doctor', 'name specialization contact email');
    const doctors = mappings.map(m => m.doctor);
    res.json({ patient: patientId, doctors });
  } catch (err) {
    next(err);
  }
};

exports.deleteMapping = async (req, res, next) => {
  try {
    const mapping = await Mapping.findById(req.params.id);
    if (!mapping) return res.status(404).json({ message: 'Mapping not found' });

    const patient = await Patient.findById(mapping.patient);
    if (patient.createdBy.toString() !== req.user.id && mapping.assignedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to remove this mapping' });
    }

    await mapping.remove();
    res.json({ message: 'Mapping removed' });
  } catch (err) {
    next(err);
  }
};
