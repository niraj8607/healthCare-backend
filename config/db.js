const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.ATLASDB_URL || 'mongodb://localhost:27017/healthcare_db';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(' MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

module.exports = connectDB;