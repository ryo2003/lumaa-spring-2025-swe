# Task Management Application

This repository contains a Task Management application built with:

- **Backend:** Node.js, Express, TypeScript, Sequelize (with sequelize-typescript), PostgreSQL
- **Frontend:** React, TypeScript, Axios, React Router (v6)

The application supports user registration, login (using JWT authentication), and basic CRUD operations for tasks (create, read, update, delete). Tasks are linked to the authenticated user.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
  - [Environment Variables](#environment-variables-for-backend)
  - [Database Setup](#database-setup)
  - [Running the Backend](#running-the-backend)
- [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables-for-frontend)
  - [Running the Frontend](#running-the-frontend)
- [Testing and Demo](#testing-and-demo)
- [Salary Expectations](#salary-expectations)
- [Additional Notes](#additional-notes)

---

## Prerequisites

- **Node.js** (v14+ recommended) and **npm**
- **PostgreSQL** installed and running on your machine
- (Optional) **Git** for version control

---

## Backend Setup

### Environment Variables for Backend

Create a `.env` file in the backend root with the following content:

```dotenv
PORT=5001
DATABASE_URL=postgres://postgres:mysecret@localhost:5432/taskmanager
JWT_SECRET=your_very_secure_random_secret_here
```

- **PORT:** Port on which the backend server will run (default: 5001)
- **DATABASE_URL:** Connection string for your PostgreSQL database. Replace `postgres` and `mysecret` with your actual database username and password.
- **JWT_SECRET:** A secure, unpredictable string used for signing JWT tokens. You can generate one using Node's `crypto` module:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

### Database Setup

1. **Create the Database:**
   Make sure PostgreSQL is running and create a database named `taskmanager` (or modify the name in the connection string accordingly).

   ```bash
   createdb taskmanager
   ```

2. **Sequelize Models & Migrations:**
   The application uses `sequelize-typescript` and automatically syncs the models on startup. Ensure your models (User, Task, etc.) are registered in `src/models/index.ts`.

### Running the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   This will start the server using `ts-node-dev`. The server will automatically sync the database models (creating or updating tables as needed).

---

## Frontend Setup

### Environment Variables for Frontend

Create a `.env` file in the frontend folder with the following content:

```dotenv
REACT_APP_API_URL=http://localhost:5001
```

- **REACT_APP_API_URL:** Base URL for your backend API. Adjust if your backend runs on a different port or domain.

### Running the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The React app will run (typically on port 3000) and should be able to communicate with your backend.

---

## Testing and Demo Video


- **Demo Video Link:**
  https://youtu.be/6TylVMLYknI

---

## Salary Expectations

My expected monthly salary is in the range of $3500 - $4500.


---

## Additional Notes

- **Backend Code Structure:**  
  The backend uses Express with controllers, routes, and middleware (including JWT-based authentication). Models are defined using `sequelize-typescript`.

- **Frontend Code Structure:**  
  The frontend uses React with TypeScript. Routing is handled via React Router v6, and Axios is used for API calls. The application stores the JWT in localStorage.

- **Security:**  
  Make sure to replace placeholder values (like `JWT_SECRET`) with secure values before deploying to production.