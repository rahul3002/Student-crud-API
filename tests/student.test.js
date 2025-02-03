const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Student = require('../src/models/student.model');

const TEST_MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_test_db';

beforeAll(async () => {
  await mongoose.connect(TEST_MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}, 10000);

beforeEach(async () => {
  await Student.deleteMany();
});

describe('Student API', () => {
  const sampleStudent = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    studentId: 'STU001',
    dateOfBirth: '2000-01-01',
    grade: 85
  };

  describe('POST /api/v1/students', () => {
    it('should create a new student', async () => {
      const response = await request(app)
        .post('/api/v1/students')
        .send(sampleStudent);
      
      expect(response.status).toBe(201);
      expect(response.body.email).toBe(sampleStudent.email);
    });
  });

  describe('GET /api/v1/students', () => {
    it('should get all students', async () => {
      await Student.create(sampleStudent);
      
      const response = await request(app).get('/api/v1/students');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(1);
    });
  });
});
