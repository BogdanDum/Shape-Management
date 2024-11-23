# Saving the markdown content to a README.md file for download
readme_content = """
# Shapes Management System

A web-based application for managing shapes with real-time updates using WebSockets. Users can create, edit, delete, and drag shapes dynamically on the page.

---

## Table of Contents

1. [Setup and Installation](#setup-and-installation)
2. [How to Use](#how-to-use)


---

## Setup and Installation

### Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies
```bash 
npm install
```

### Set up environment variables
Create a .env file in the root directory and configure the following variables:
```bash
WS_PORT=8083       # WebSocket server port
DATABASE_URL=<your-database-url>  # Prisma database connection string
```
### Migrate the database
Use Prisma to migrate the database schema:
```bash
npx prisma migrate dev --name init
```
### Start the websocket server 
Open a terminal and run:
```bash
npm run dev:ws
```
### Start the nuxt development server
```bash
npm run dev 
```

## How to use 
### Login Page
- Visit the login page at http://localhost:3000/login. (or port 3001, 3002, 3003, whatever port is available)
- Enter your username and password to log in. (they are inserted in the database using SQL)
- If successful, you'll be redirected to the Shapes Management page.

### Shapes Management
- Add a Shape: Click the "Add Shape" button to create a new shape.
- Edit a Shape: Click any shape to open the edit menu.
- Delete a Shape: Use the edit menu to delete the selected shape.
- Drag Shapes: Drag shapes to reposition them dynamically.
- Real-time Updates: All changes are updated live for all connected users.

- I have also implemented API endpoints for this actions 

### Username and Password
Since one requirement was to generate these in the backend and allow the user to log in based on them,
you can insert the usernames and passwords using the following query
that you can write in the pgadmin query tool:
```bash
INSERT INTO "User" (username, password) VALUES
('user1', 'pass1'),
('user2', 'user2'),
('user3', 'user3');
```