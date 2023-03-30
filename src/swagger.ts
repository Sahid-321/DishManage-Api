import { OAS3Definition } from 'swagger-jsdoc';
const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: {
      title: 'Dish Management API',
      version: '1.0.0',
      description: 'This is Dish Management API ',
    },
    servers: [
      {
        url: '/',
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    };
  
  export default swaggerDefinition;