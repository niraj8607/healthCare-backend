const mongoose = require('mongoose');
const mappingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',          
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',          
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',             
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'assignedAt', updatedAt: false },
   
  }
);

mappingSchema.index({ patient: 1, doctor: 1 }, { unique: true });

const Mapping = mongoose.model('Mapping', mappingSchema);
module.exports = Mapping;