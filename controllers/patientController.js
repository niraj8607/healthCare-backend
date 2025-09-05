const { validationResult } = require('express-validator');
const Patient = require('../models/Patient');

exports.createPatient = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, age, gender, contact, notes } = req.body;
    const patient = new Patient({
      name, age, gender, contact, notes,
      createdBy: req.user.id
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this patient' });
    }
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this patient' });
    }

    const updates = (({ name, age, gender, contact, notes }) => ({ name, age, gender, contact, notes }))(req.body);
    Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k]);

    const updated = await Patient.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (patient.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this patient' });
    }
    await patient.remove();
    res.json({ message: 'Patient removed' });
  } catch (err) {
    next(err);
  }
};
