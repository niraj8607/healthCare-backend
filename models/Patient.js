const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,            
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'], 
      default: 'other',
    },
    contact: {
      type: String,        
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',      
      required: true,
    },
  },
  {
    timestamps: true,       
  }
);


const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;