require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../src/utils/logger');

const createStudentCollection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create collection with validation
    await mongoose.connection.createCollection('students', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['firstName', 'lastName', 'email', 'studentId', 'dateOfBirth', 'grade'],
          properties: {
            firstName: {
              bsonType: 'string',
              description: 'First name is required',
            },
            lastName: {
              bsonType: 'string',
              description: 'Last name is required',
            },
            email: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              description: 'Email must be a valid email address',
            },
            studentId: {
              bsonType: 'string',
              description: 'Student ID is required',
            },
            dateOfBirth: {
              bsonType: 'date',
              description: 'Date of birth is required',
            },
            grade: {
              bsonType: 'number',
              minimum: 0,
              maximum: 100,
              description: 'Grade must be between 0 and 100',
            },
          },
        },
      },
    });

    logger.info('Students collection created successfully');
    await mongoose.connection.close();
  } catch (error) {
    logger.error('Error creating students collection:', error);
    process.exit(1);
  }
};

createStudentCollection();
