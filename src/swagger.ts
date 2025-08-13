import swaggerJSDoc from 'swagger-jsdoc';
import config from './config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'RoCoRa API',
    version: '1.0.0',
    description: 'Documentación de la API para el proyecto RoCoRa.',
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}/api`,
      description: 'Servidor de Desarrollo',
    },
    {
      url: `http://elandorum.com/rocora/api`,
      description: 'Servidor de Desarrollo',
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'Clave de API para autenticar las peticiones que modifican datos.'
      }
    }
  },
};

const options = {
  swaggerDefinition,
  // Rutas a los archivos que contienen las definiciones de OpenAPI (tus rutas)
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

