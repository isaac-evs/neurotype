// src/swagger/swaggerDocs.ts
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';

const setupSwaggerDocs = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log('Swagger docs available at http://localhost:3000/api-docs');
};

export default setupSwaggerDocs;