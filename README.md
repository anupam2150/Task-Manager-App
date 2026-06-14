# TaskManager - Full Stack .NET + React App

A full stack task management application built with ASP.NET Core 10 Web API and React.

## Features

- User registration and login with JWT authentication
- Create and manage projects
- Kanban board with tasks (Todo / In Progress / Done)
- Task priorities (Low / Medium / High) and due dates
- Secure API with rate limiting, input validation and security headers

## Tech Stack

**Backend**
- ASP.NET Core 10 Web API
- Entity Framework Core 10 with SQLite
- JWT Bearer authentication
- BCrypt password hashing

**Frontend**
- React 19 + Vite
- React Router DOM
- Axios

## Getting Started

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js 18+](https://nodejs.org)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend/TaskManager.API
   ```

2. Set the required environment variable for JWT:
   ```bash
   # Windows
   set JWT__Key=your-secret-key-min-32-characters-long

   # macOS/Linux
   export JWT__Key=your-secret-key-min-32-characters-long
   ```

3. Apply database migrations:
   ```bash
   dotnet tool run dotnet-ef -- database update
   ```

4. Run the API:
   ```bash
   dotnet run
   ```

API runs at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

App runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |
| GET | `/api/projects` | Get all projects (paginated) | Yes |
| POST | `/api/projects` | Create a project | Yes |
| PUT | `/api/projects/{id}` | Update a project | Yes |
| DELETE | `/api/projects/{id}` | Delete a project | Yes |
| GET | `/api/projects/{id}/tasks` | Get tasks for a project | Yes |
| POST | `/api/projects/{id}/tasks` | Create a task | Yes |
| PUT | `/api/projects/{id}/tasks/{taskId}` | Update a task | Yes |
| DELETE | `/api/projects/{id}/tasks/{taskId}` | Delete a task | Yes |

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character

## Security

- JWT tokens expire after 7 days
- Auth endpoints rate limited to 10 requests/minute
- Passwords hashed with BCrypt
- Security headers on all responses
- Input validation on all endpoints
