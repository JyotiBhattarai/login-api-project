# Login API Project

A full-stack login and registration system built with Node.js and Express, created while exploring backend development and Node.js fundamentals. The project covers user registration, login, and session-based authentication, connecting a simple HTML/JavaScript frontend to an Express backend.

Users can create an account, log in with their credentials, and access a protected dashboard that displays their email — accessible only while their session is active.

## Features

- User registration with client-side validation
- User login with session-based authentication
- Protected dashboard showing the logged-in user's email
- Logout functionality that ends the session

## Technologies Used

- Node.js
- Express
- express-session
- HTML, CSS, JavaScript (vanilla frontend)
- JSON file storage for user data

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/JyotiBhattarai/login-api-project.git
```

### 2. Move into the project folder

```bash
cd login-api-project
```

### 3. Install dependencies

This installs Express and express-session, as listed in `package.json`.

```bash
npm install
```

### 4. Create the users file

The server reads from a `users.json` file at startup, so an empty one needs to exist before running it for the first time.

```bash
echo [] > users.json
```

### 5. Start the server

```bash
node server.js
```

You should see a message in the terminal confirming the server is running.

### 6. Open the app in your browser

Go to:

```
http://localhost:3000
```

From there, you can register a new account, log in, and view the dashboard.