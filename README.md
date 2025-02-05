# Student CRUD API

A RESTful API for managing student records built with Node.js, Express, and MongoDB.

## Features

- Create, Read, Update, and Delete student records
- MongoDB database integration
- Docker support
- Logging system
- Test suite

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker (optional)

## Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and update the values
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Using Node.js
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Using Docker
```bash
# Build and run using docker-compose
docker-compose up --build
```

## Testing
```bash
npm test
```

## API Documentation

### Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student
