# TaskManager - Full Stack .NET + React App

A full stack task management application built with ASP.NET Core 10 Web API and React 19.

## Features

- **Authentication** — User registration and login with JWT
- **Projects** — Create, update, delete projects with progress tracking
- **Kanban Board** — Drag & drop tasks across Todo / In Progress / Done columns
- **Task Priorities & Due Dates** — Low / Medium / High with overdue/due-soon indicators
- **Task Activity Log** — Automatic timeline of all changes per task
- **Time Tracking** — Start/stop timer per task, logs time spent
- **Task Archiving** — Archive and restore tasks, with a dedicated archived panel
- **Recurring Tasks** — Daily / Weekly / Monthly auto-spawn via background service
- **CSV Export** — Download all tasks for a project as a CSV file
- **System Theme** — Auto dark/light mode from OS preference with manual toggle
- **Public Project Sharing** — Generate a read-only shareable link per project
- **Task Dependencies** — Mark tasks as blocked-by other tasks; blocks moving to Done until resolved
- **Labels** — Color-coded labels assignable to tasks
- **Subtasks** — Checklist items per task with progress bar
- **Comments** — Per-task comment thread
- **Secure API** — Rate limiting, input validation, security headers

## Tech Stack

**Backend**
- ASP.NET Core 10 Web API
- Entity Framework Core 10 with SQLite
- JWT Bearer authentication
- BCrypt password hashing
- Hosted background service for recurring tasks

**Frontend**
- React 19 + Vite
- React Router DOM
- Axios
- @dnd-kit/core + @dnd-kit/sortable (drag & drop)

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

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT token | No |

### Projects
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/projects` | Get all projects (paginated) | Yes |
| POST | `/api/projects` | Create a project | Yes |
| PUT | `/api/projects/{id}` | Update a project | Yes |
| DELETE | `/api/projects/{id}` | Delete a project | Yes |
| POST | `/api/projects/{id}/share` | Generate a public share token | Yes |
| DELETE | `/api/projects/{id}/share` | Revoke the share token | Yes |

### Tasks
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/projects/{id}/tasks` | Get tasks (paginated) | Yes |
| POST | `/api/projects/{id}/tasks` | Create a task | Yes |
| PUT | `/api/projects/{id}/tasks/{taskId}` | Update a task | Yes |
| DELETE | `/api/projects/{id}/tasks/{taskId}` | Delete a task | Yes |
| GET | `/api/projects/{id}/tasks/export` | Export tasks as CSV | Yes |
| GET | `/api/projects/{id}/tasks/archived` | Get archived tasks | Yes |
| POST | `/api/projects/{id}/tasks/{taskId}/archive` | Archive a task | Yes |
| POST | `/api/projects/{id}/tasks/{taskId}/restore` | Restore an archived task | Yes |
| POST | `/api/projects/{id}/tasks/{taskId}/time` | Log time spent | Yes |
| POST | `/api/projects/{id}/tasks/{taskId}/dependencies/{blockerId}` | Add a blocker dependency | Yes |
| DELETE | `/api/projects/{id}/tasks/{taskId}/dependencies/{blockerId}` | Remove a blocker dependency | Yes |
| POST | `/api/projects/{id}/tasks/{taskId}/labels/{labelId}` | Add a label to a task | Yes |
| DELETE | `/api/projects/{id}/tasks/{taskId}/labels/{labelId}` | Remove a label from a task | Yes |
| GET | `/api/projects/{id}/tasks/{taskId}/subtasks` | Get subtasks | Yes |
| POST | `/api/projects/{id}/tasks/{taskId}/subtasks` | Add a subtask | Yes |
| PUT | `/api/projects/{id}/tasks/{taskId}/subtasks/{subId}` | Update a subtask | Yes |
| DELETE | `/api/projects/{id}/tasks/{taskId}/subtasks/{subId}` | Delete a subtask | Yes |
| GET | `/api/projects/{id}/tasks/{taskId}/comments` | Get comments | Yes |
| POST | `/api/projects/{id}/tasks/{taskId}/comments` | Add a comment | Yes |
| DELETE | `/api/projects/{id}/tasks/{taskId}/comments/{commentId}` | Delete a comment | Yes |

### Labels
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/labels` | Get all labels | Yes |
| POST | `/api/labels` | Create a label | Yes |
| DELETE | `/api/labels/{id}` | Delete a label | Yes |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/dashboard` | Get stats and recent tasks | Yes |

### Public
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/public/projects/{token}` | View a shared project (read-only) | No |

## Database Migrations

| Migration | Description |
|-----------|-------------|
| `InitialCreate` | Users, Projects, Tasks |
| `AddLabelsCommentsSubtasks` | Labels, Comments, SubTasks, TaskLabels |
| `AddActivityLog` | ActivityLog model |
| `AddTimeTracking` | TimeSpentSeconds on TaskItem |
| `AddTaskArchiving` | IsArchived, ArchivedAt on TaskItem |
| `AddRecurringTasks` | RecurrenceType, RecurrenceSpawned on TaskItem |
| `AddProjectShareToken` | ShareToken on Project |
| `AddTaskDependencies` | TaskDependencies join table |

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
- `[Consumes("application/json")]` on all mutating endpoints (CSRF mitigation)
