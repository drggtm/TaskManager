# Task Management App with Docker

A full-stack task management application with Node.js, Express, MongoDB backend and a simple frontend built with HTML, JavaScript, and Tailwind CSS. The application is containerized using Docker for easy deployment.

## Features

- Create and view tasks
- Responsive UI using Tailwind CSS
- REST API for task operations
- MongoDB database integration
- Dockerized application
- CI/CD with GitHub Actions

## Project Structure

```
task-manager/
├── .github/
│   └── workflows/
│       └── docker-build-push.yml
├── models/
│   └── Task.js
├── public/
│   ├── index.html
│   └── script.js
├── .env
├── Dockerfile
├── README.md
├── package.json
└── server.js
```

## Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud instance)
- Docker (for containerized deployment)
- GitHub account (for CI/CD pipeline)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:drggtm/Task_Manager.git
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Docker Deployment

### Build and run using Dockerfile

1. Build the Docker image:
   ```bash
   docker build -t task-manager-app:latest .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env -d --name task-app task-manager-app
   ```

### Pull from GitHub Container Registry

```bash
docker pull ghcr.io/yourusername/task-manager:latest
docker run -p 3000:3000 --env-file .env -d --name task-app ghcr.io/yourusername/task-manager:latest
```

## CI/CD Pipeline

This project uses GitHub Actions to automatically build and push Docker images to GitHub Container Registry (ghcr.io) when changes are pushed to the main branch.

The workflow will:
1. Build the Docker image using the multi-stage Dockerfile
2. Push the image to GitHub Container Registry
3. Tag the image with branch name, commit SHA, and semantic versions (if applicable)

## API Endpoints

| Method | Endpoint    | Description       | Request Body                        |
|--------|-------------|-------------------|-------------------------------------|
| GET    | /api/tasks  | Get all tasks     | None                                |
| POST   | /api/tasks  | Create a new task | `{ "title": "", "description": ""}` |

## Frontend

The frontend provides a simple interface to:
- Add new tasks with a title and optional description
- View all tasks in a table format with creation timestamps

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.