# todoapp
# To-Do API

A production-ready REST API for managing to-do items with user authentication.

## Features

- ✅ User authentication (signup/login)
- ✅ Secure password hashing (bcryptjs)
- ✅ JWT token-based sessions
- ✅ User isolation (see only your to-dos)
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ MongoDB cloud database
- ✅ Production deployment

## Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT + bcryptjs
- **Hosting:** Render

## Live API
https://todoapp-4nvt.onrender.com
## How to Use

### 1. Sign Up

```bash
curl -X POST https://todoapp-4nvt.onrender.com/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Response:**
```json
{"message":"User Created","email":"user@example.com"}
```

### 2. Login

```bash
curl -X POST https://todoapp-4nvt.onrender.com/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Response:**
```json
{"message":"Login successful!","token":"eyJhbGciOiJIUzI1NiIs..."}
```

Copy the token.

### 3. Create To-Do

```bash
curl -X POST https://todoapp-4nvt.onrender.com/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_TOKEN_HERE" \
  -d '{"title":"Learn MongoDB","description":"Complete CRUD tutorial"}'
```

### 4. Get All Your To-Dos

```bash
curl https://todoapp-4nvt.onrender.com/todos \
  -H "Authorization: YOUR_TOKEN_HERE"
```

### 5. Update To-Do

```bash
curl -X PUT https://todoapp-4nvt.onrender.com/todos/TODO_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_TOKEN_HERE" \
  -d '{"title":"Updated title","description":"Updated description","completed":true}'
```

### 6. Delete To-Do

```bash
curl -X DELETE https://todoapp-4nvt.onrender.com/todos/TODO_ID \
  -H "Authorization: YOUR_TOKEN_HERE"
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Create new user |
| POST | `/login` | Login and get token |
| POST | `/todos` | Create to-do (requires token) |
| GET | `/todos` | Get all your to-dos (requires token) |
| PUT | `/todos/:id` | Update to-do (requires token) |
| DELETE | `/todos/:id` | Delete to-do (requires token) |

## Security Features

- ✅ Passwords hashed with bcryptjs
- ✅ JWT token authentication
- ✅ User data isolation
- ✅ No plaintext passwords stored
- ✅ Token validation on protected routes

## Installation (Local Development)

```bash
# Clone repo
git clone https://github.com/MohdAkhlad778/todoapp.git
cd todoapp

# Install dependencies
npm install

# Start server
node server.js
```

Server runs at `http://localhost:3000`

## Built By

Mohd Akhlad - Full-Stack Developer

## License

MIT
