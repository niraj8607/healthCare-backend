const { validationResult } = require('express-validator');
const Doctor = require('../models/Doctor');

exports.createDoctor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, specialization, contact, email } = req.body;
    const doctor = new Doctor({ name, specialization, contact, email });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
};

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const updates = (({ name, specialization, contact, email }) => ({ name, specialization, contact, email }))(req.body);
    Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k]);

    const updated = await Doctor.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await doctor.remove();
    res.json({ message: 'Doctor removed' });
  } catch (err) {
    next(err);
  }
};
