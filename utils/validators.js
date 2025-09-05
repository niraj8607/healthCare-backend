const { body } = require('express-validator');


exports.registerValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('A valid email is required'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];


exports.loginValidator = [
  body('email')
    .isEmail()
    .withMessage('A valid email is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

exports.patientValidator = [
  body('name')
    .notEmpty()
    .withMessage('Patient name is required'),

  body('age')
    .isInt({ min: 0 })
    .withMessage('Age must be a valid positive number'),
];

exports.doctorValidator = [
  body('name')
    .notEmpty()
    .withMessage('Doctor name is required'),
];

exports.mappingValidator = [
  body('patient')
    .notEmpty()
    .withMessage('Patient ID is required'),

  body('doctor')
    .notEmpty()
    .withMessage('Doctor ID is required'),
];