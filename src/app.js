const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student.routes');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/v1/students', studentRoutes);

// Health check endpoint
app.get('/healthcheck', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

// Error handling middleware
app.use((err, req, res, _next) => {
  logger.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
