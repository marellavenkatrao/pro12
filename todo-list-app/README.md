# RESTful To-Do List API

A robust RESTful To-Do List API built using **Node.js**, **Express.js**, and **MongoDB** with **Mongoose ODM**, providing full CRUD (Create, Read, Update, Delete) functionality with schema validation, timestamps, and environment configuration.

---

## 🛠️ Tech Stack & Dependencies

- **Node.js** – JavaScript runtime environment
- **Express.js** – Web application framework
- **MongoDB** & **Mongoose ODM** – Document database and object data modeling
- **dotenv** – Environment variable management
- **cors** – Cross-Origin Resource Sharing middleware
- **nodemon** – Development server with automatic reload

---

## 📁 Project Structure

```
todo-list-app/
├── models/
│   └── Task.js          # Mongoose schema and model for tasks
├── routes/
│   └── tasks.js         # RESTful API route handlers
├── .env                 # Environment variables configuration
├── package.json         # Project metadata and dependencies
├── server.js            # Express application entry point & MongoDB connection
├── test.js              # Automated test suite for CRUD endpoints
└── README.md            # API Documentation
```

---

## ⚙️ Environment Configuration (`.env`)

```env
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/todo-list
```

---

## 📋 Data Model (`models/Task.js`)

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `userId` | `String` | Yes | - | ID of user owning the task |
| `title` | `String` | Yes | - | Title / name of the task |
| `description`| `String` | No | - | Detailed description |
| `priority` | `String` | No | `'Medium'` | `'Low'`, `'Medium'`, or `'High'` |
| `category` | `String` | No | - | Category (e.g., Work, Personal, Study) |
| `dueDate` | `Date` | No | - | Target completion date |
| `completed` | `Boolean`| No | `false` | Completion status |
| `createdAt` | `Date` | Auto | - | Timestamp when task was created |
| `updatedAt` | `Date` | Auto | - | Timestamp when task was last updated |

---

## 🚀 API Endpoints

### 1. Root / Health Check
- **Endpoint:** `GET /`
- **Response:**
  ```text
  Welcome to the To-Do List API! Use /api/tasks to interact.
  ```

---

### 2. Create Task (Test 1)
- **Endpoint:** `POST /api/tasks`
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "userId": "user123",
    "title": "Complete Lab Assignment",
    "description": "Implement CRUD operations in Express and MongoDB",
    "priority": "High",
    "category": "Study",
    "dueDate": "2026-10-09T18:00:00.000Z"
  }
  ```
- **Response Status:** `201 Created`
- **Response Body:**
  ```json
  {
    "_id": "6ac7320eb5dff9d4eaec70ba",
    "userId": "user123",
    "title": "Complete Lab Assignment",
    "description": "Implement CRUD operations in Express and MongoDB",
    "priority": "High",
    "category": "Study",
    "dueDate": "2026-10-09T18:00:00.000Z",
    "completed": false,
    "createdAt": "2026-10-08T06:02:54.123Z",
    "updatedAt": "2026-10-08T06:02:54.123Z",
    "__v": 0
  }
  ```

---

### 3. Retrieve Tasks by User (Test 2)
- **Endpoint:** `GET /api/tasks/:userId`
- **URL Parameter:** `userId` (e.g. `user123`)
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  [
    {
      "_id": "6ac7320eb5dff9d4eaec70ba",
      "userId": "user123",
      "title": "Complete Lab Assignment",
      "description": "Implement CRUD operations in Express and MongoDB",
      "priority": "High",
      "category": "Study",
      "completed": false,
      "createdAt": "2026-10-08T06:02:54.123Z",
      "updatedAt": "2026-10-08T06:02:54.123Z"
    }
  ]
  ```

---

### 4. Update Task (Test 3)
- **Endpoint:** `PUT /api/tasks/:id`
- **URL Parameter:** `id` (e.g. `6ac7320eb5dff9d4eaec70ba`)
- **Request Body:**
  ```json
  {
    "completed": true,
    "priority": "Medium"
  }
  ```
- **Response Status:** `200 OK`
- **Response Body:** Updated task document reflecting modified fields.

---

### 5. Delete Task (Test 4)
- **Endpoint:** `DELETE /api/tasks/:id`
- **URL Parameter:** `id` (e.g. `6ac7320eb5dff9d4eaec70ba`)
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## 🧪 Running the Tests

To run the automated test suite verifying all 4 sample tests:

```bash
npm test
```

### Sample Test Breakdown:

| Test | Endpoint / Action | Expected Result | Points |
| :--- | :--- | :--- | :--- |
| **1** | `POST /api/tasks` | Create task with title, description, priority | **5 / 5** |
| **2** | `GET /api/tasks/:userId` | Retrieve all tasks for a user | **5 / 5** |
| **3** | `PUT /api/tasks/:id` | Update task (e.g., mark completed) | **5 / 5** |
| **4** | `DELETE /api/tasks/:id` | Delete task by ID | **5 / 5** |
| **Total** | | | **20 / 20** |

---

## 🏃 Running the Application

### Start production server:
```bash
npm start
# or: node server.js
```

### Start development server (with nodemon):
```bash
npm run dev
```
