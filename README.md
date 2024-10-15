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

- POST `/api/users/signup`: Create a new user
- POST `/api/users/login`: Log in an existing user
- GET `/api/users/home`: Get the user's home
- GET `/api/users`: Gets all users

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Cors
- Helmet
