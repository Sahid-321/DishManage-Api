"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerDefinition = {
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
exports.default = swaggerDefinition;
//# sourceMappingURL=swagger.js.map