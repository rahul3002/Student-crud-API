const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  grade: {
    type: Number,
    required: [true, 'Grade is required'],
    min: [0, 'Grade cannot be less than 0'],
    max: [100, 'Grade cannot be more than 100'],
  },
}, {
  timestamps: true,
});

studentSchema.index({ email: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Student', studentSchema);
