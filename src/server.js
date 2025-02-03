require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db.config');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
