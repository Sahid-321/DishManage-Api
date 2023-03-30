import { OAS3Definition } from 'swagger-jsdoc';
const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: {
      title: 'Annamandir API',
      version: '1.0.0',
      description: 'This is annamandir API ',
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