const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Web III',
            version: '1.0.0',
            description: 'API de usuários com login JWT e previsão do tempo (Open-Meteo)',
        },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
        apis: [path.join(__dirname, '../routes/*.js').replace(/\\/g, '/')],    apis: [path.join(__dirname, '../routes/*.js').replace(/\\/g, '/')],
};

module.exports = swaggerJsdoc(options);