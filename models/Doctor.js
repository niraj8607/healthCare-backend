const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,              
    },
    specialization: {
      type: String,
      trim: true,
    },
    contact: {
      type: String,            
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,        
      trim: true,
      unique: true,            
      sparse: true,            
    },
  },
  {
    timestamps: true,        
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;