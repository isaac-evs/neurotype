// swaggerConfig.js
import path from 'path';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Neurotype',
      version: '1.0.0',
      description: 'aplicación de procesamiento de textos de pacientes clínicos, específicamente en el área de salud mental, en el que el usuario pueda insertar textos o audios referentes a sesiones terapéuticas, donde tendencias como depresión, ansiedad, OCD, PTSD, entre otras son detectadas.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your actual server URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',  // Typically, "JWT" is used for JSON Web Tokens
        },
      },
      schemas: {
        Note: {
          type: 'object',
          properties: {
            user: {
              type: 'string',
              description: "The user's unique identifier",
              example: '60f71b9f1e8a4b00177628c7',
            },
            content: {
              type: 'string',
              description: 'The content of the note',
              example: 'This is a note content',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Tags related to the note',
              example: ['work', 'important'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the note was created',
              example: '2024-10-10T14:48:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the note was last updated',
              example: '2024-10-12T16:50:00.000Z',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],  // Apply the bearerAuth globally if needed
      },
    ],
  },
  apis: [`${path.join(__dirname, ".", "routes", '*.ts')}`], // Path to the API docs (adjust according to your project)
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;