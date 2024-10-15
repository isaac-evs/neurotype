# Neuro Type Backend
This is the backend for the Neuro Type application, a tool for processing clinical patient notes in the mental health field.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file
5. Build for production: `npm run start`

## Project Structure

- `src/`: Source code
  - `config/`: Configuration files
  - `controllers/`: Request handlers
  - `middlewares/`: Middleware functions
  - `models/`: Database models
  - `routes/`: API routes
  - `app.ts`: Express app
- `.env`: Environment variables (git-ignored)
- `tsconfig.json`: TypeScript configuration
- `package.json`: Project metadata and dependencies
- `README.md`: Project documentation

## API Endpoints

# User Routes
- POST `/api/users/signup`: Create a new user
- POST `/api/users/login`: Log in an existing user
- GET `/api/users/home`: Get the user's dashboard
- GET `/api/users`: Gets all users

# Upload Routes
- POST `/api/upload`: Upload image

# Notes Routes
- POST `/api/notes`: Create a new note
- GET `/api/notes`: Gets all notes
- GET `/api/notes/<id>`: Get a specific note
- PUT `/api/notes/<id>`: Updates a note
- DELETE `/api/notes/<id>`: Deletes a note
- DELETE `/api/notes/`: Deletes all notes

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Cors
- Helmet
