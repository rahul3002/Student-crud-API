require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db.config');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Start server with error handling
const server = app
  .listen(PORT)
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`Port ${PORT} is already in use. Trying ${PORT + 1}...`);
      // Try the next port
      server.listen(PORT + 1);
    } else {
      logger.error('Server error:', err);
    }
  })
  .on('listening', () => {
    const address = server.address();
    logger.info(`Server is running on port ${address.port}`);
  });
