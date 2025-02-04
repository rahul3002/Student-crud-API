const Student = require('../models/student.model');
const logger = require('../utils/logger');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (error) {
    logger.error('Error getting students:', error);
    return res.status(500).json({ message: 'Error getting students' });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json(student);
  } catch (error) {
    logger.error('Error getting student:', error);
    return res.status(500).json({ message: 'Error getting student' });
  }
};

// Create new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    return res.status(201).json(savedStudent);
  } catch (error) {
    logger.error('Error creating student:', error);
    return res.status(400).json({ message: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json(student);
  } catch (error) {
    logger.error('Error updating student:', error);
    return res.status(400).json({ message: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    logger.error('Error deleting student:', error);
    return res.status(500).json({ message: 'Error deleting student' });
  }
};
