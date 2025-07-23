# H2S Task Manager Backend API

A secure backend API to manage users, tasks, and subtasks with JWT authentication, built using Express.js and MongoDB.

---

## Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Postman (for testing)

---

## Project Structure
---

## Authentication

- Register: `POST /auth/register`
- Login: `POST /auth/login`
- All `/tasks` routes require Bearer token

---

## Features

- User Registration/Login (with hashed password)
- JWT-based route protection
- Tasks embedded inside users
- Subtasks embedded inside tasks
- Soft delete for tasks/subtasks
- Subtask updates retain deleted entries

---

## API Endpoints

### Auth
- `POST /auth/register` – Register new user
- `POST /auth/login` – Login user

### Tasks (Protected)
- `GET /tasks` – List tasks & subtasks
- `POST /tasks` – Add a new task
- `PUT /tasks/:taskId` – Update a task
- `DELETE /tasks/:taskId` – Soft-delete task

### Subtasks
- `GET /tasks/:taskId/subtasks` – List subtasks
- `PUT /tasks/:taskId/subtasks` – Replace visible subtasks

---

## Install & Run

```bash
git clone https://github.com/Nikita-7024/H2S_taskManager.git
cd H2S_taskManager
cd src
npm install
cp .env.example
Mongo_URI : mongodb://localhost:27017/taskmanager
PORT= 5000
npm run dev


