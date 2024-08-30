# Task Management System

## Overview

This project is a full-stack web application consisting of a client-side built with Vite and React, and a server-side built with Node.js and Express. The client and server can be run simultaneously using the concurrently package.

## Prerequisites

Before setting up the project, ensure that you have the following software installed:

- [Node.js (>= 18.x)](https://nodejs.org/)
- [MySQL](https://www.mysql.com/downloads/)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Sidd27/task-management-system
cd task-management-system
```

2. **Install root-level dependencies**

Run the following command from the root directory to install the dependencies required to run the client and server together:

```bash
npm install
```

This will install the concurrently package and other dependencies defined in the root package.json.

3. **Set up the Server and Client**

For detailed setup instructions, refer to the README.md files located in each directory:

- [Server Setup](https://github.com/Sidd27/task-management-system/blob/main/server/readme.md)
- [Client Setup](https://github.com/Sidd27/task-management-system/blob/main/client/README.md)

**_NOTE:_**: Make sure to follow the setup steps in each of these files to configure the server and client individually. This includes setting up environment variables, database configurations, and any other specific requirements.

4. **Running the Application**

Once you have set up both the server and client, you can run them simultaneously using the following command from the root directory:

```bash
npm run dev
```

5. **Accessing the Application**

- The client-side application will be accessible at http://localhost:3000
- The server-side API will be accessible at http://localhost:3001

6. **Building for Production**

To build the client for production, follow the instructions in the [Client README.md](https://github.com/Sidd27/task-management-system/blob/main/client/README.md).

### Project Structure

```
task-management-system/
│
├── client/          # Vite + React client application
│   ├── README.md    # Client-specific setup instructions
│
├── server/          # Node.js + Express server application
│   ├── README.md    # Server-specific setup instructions
│
├── package.json     # Root-level package.json (manages concurrently)
├── README.md        # This readme file
└── ...
```

## License

This project is licensed under the MIT License.
