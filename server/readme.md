# Server

### Overview

This is a task management system built with Node.js, Express.js, MySQL, and Passport for user authentication. It provides RESTful APIs for user registration, login, and task management.

### Features

- User registration and login
- Task creation, retrieval, update, and deletion
- JWT-based authentication

## Setup and Installation

### Prerequisites

- [Node.js (>= 18.x)](https://nodejs.org/)
- [MySQL](https://www.mysql.com/downloads/)

### Installation

Follow these steps to set up and run the project:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sidd27/task-management-system
   cd task-management-system/server
   ```

2. **Install Dependencies**

Install the required dependencies using npm or yarn.

```bash
npm install
```

3. **Create or Edit the .env File**

If a `.env` file doesn’t already exist in the server directory, create one. If it exists, open it for editing.
Add or update the following environment variables in the `.env` file:

```bash
PORT=3001
JWT_SECRET=your_jwt_secret
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=task_management
```

- PORT: The port on which the server will run.
- JWT_SECRET: The secret key for signing JWT tokens.
- DB_HOST: The hostname of your MySQL server.
- DB_USER: The MySQL user.
- DB_PASSWORD: The MySQL password.
- DB_NAME: The name of your MySQL database.

4. **Create Database Tables**

Run the migration script to create the necessary tables:

```bash
npm run create-tables
```

5. **Start the Server**

You can start the server with:

```bash
npm start
```

Or for development, you might use:

```bash
npm run dev
```

## License

This project is licensed under the MIT License.
