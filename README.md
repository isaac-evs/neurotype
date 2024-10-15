<<<<<<< HEAD
# neurotype

# Tabla de Roles y Responsabilidades

| Módulo | Acción | Lite | Plus | Pro |
|--------|--------|------|------|-----|
| **Autenticación** |
| | Registro | ✓ | ✓ | ✓ |
| | Inicio de sesión | ✓ | ✓ | ✓ |
| **Gestión de Notas** |
| | Importar notas | ✓ | ✓ | ✓ |
| | Ingresar texto manualmente | ✓ | ✓ | ✓ |
| | Importar grabaciones de audio | | | ✓ |
| | Transcripción de audio a texto | | | ✓ |
| | Organizar notas por paciente | | | ✓ |
| | Seleccionar y archivar notas relevantes | | | ✓ |
| **Análisis de Texto** |
| | Análisis básico con spaCy | ✓ | ✓ | ✓ |
| | Análisis avanzado con BERT/GPT | | ✓ | ✓ |
| | Detección de emociones y sentimientos básicos | ✓ | ✓ | ✓ |
| | Detección de variaciones sutiles y patrones complejos | | ✓ | ✓ |
| **Visualización de Datos** |
| | Gráficos sencillos de evolución emocional | ✓ | ✓ | ✓ |
| | Gráficos avanzados e interactivos | | ✓ | ✓ |
| | Líneas de tiempo de evolución emocional | | ✓ | ✓ |
| **Gestión de Pacientes** |
| | Registro de pacientes | | | ✓ |
| | Seguimiento de sesiones por paciente | | | ✓ |
| | Análisis de tendencias a largo plazo por paciente | | | ✓ |
=======
# Neuro Type Backend

This is the backend for the Neuro Type application, a tool for processing clinical patient notes in the mental health field.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and fill in your environment variables
4. Run the development server: `npm run dev`
5. Build for production: `npm run build`
6. Start the production server: `npm start`

## Project Structure

- `src/`: Source code
  - `controllers/`: Request handlers
  - `models/`: Database models
  - `routes/`: API routes
  - `config/`: Configuration files
  - `app.ts`: Express app setup
  - `index.ts`: Entry point
- `dist/`: Compiled JavaScript files
- `.env`: Environment variables (git-ignored)
- `.env.example`: Example environment variables
- `tsconfig.json`: TypeScript configuration
- `package.json`: Project metadata and dependencies

## API Endpoints

- POST `/api/users`: Create a new user
- GET `/api/users`: Get all users

(Add more endpoints as they are implemented)

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Cors
- Helmet

>>>>>>> 8943dd7 (added auth / authorization functionality)
