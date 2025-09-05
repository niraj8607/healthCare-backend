require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const mappingRoutes = require('./routes/mappings');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());            
app.use(cors());            
app.use(express.json());   
app.use(morgan('dev')); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

app.use(errorHandler);

// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is up and running!`);
 console.log(`Listening on: http://localhost:${PORT}`);
});