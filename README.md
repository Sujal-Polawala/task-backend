# Task Management Backend API

A RESTful backend API for a task management application, built with **Node.js**, **Express.js**, and **MongoDB**. Provides endpoints for creating, reading, updating, and deleting tasks, designed to work seamlessly with a Next.js frontend.

---

## Features

- Create, read, update, and delete tasks (CRUD)
- MongoDB integration using Mongoose ODM
- REST API routing with Express.js
- JSON request and response handling
- Basic error handling and input validation

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JavaScript (ES6+)

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Sujal-Polawala/task-backend.git
cd task-backend
```
2. Install dependencies:

```bash
npm install
```
3. Setup environment variables:

Create a .env file in the root folder with the following content:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
Replace your_mongodb_connection_string with your actual MongoDB URI.
```
4. Start the server:

```bash
npm start
```
Or for development with auto-reloading (if using nodemon):

```bash
npm run dev
```

5. The API server will be running at http://localhost:5000

## API Endpoints
# Method	Endpoint	Description
- GET	/api/tasks	Get all tasks
- POST	/api/tasks	Create a new task
- GET	/api/tasks/:id	Get a task by ID
- PUT	/api/tasks/:id	Update a task by ID
- DELETE	/api/tasks/:id	Delete a task by ID

## Folder Structure
```bash
task-backend/
├── config/           # Database connection and config files
├── controllers/      # Route handlers / controllers
├── models/           # Mongoose models
├── routes/           # Express route definitions
├── middleware/       # Custom middleware (optional)
├── app.js            # Express app entry point
├── package.json
└── .env              # Environment variables (not committed)
```

## Deployment

# You can deploy this backend on platforms like Heroku, Render, DigitalOcean App Platform, or AWS. Just ensure:
- Your MONGO_URI environment variable is set correctly on the hosting platform.
- Your PORT environment variable matches the hosting environment port.

## Author
- Developed by Sujal Polawala

## License
This project is licensed under the MIT License.
