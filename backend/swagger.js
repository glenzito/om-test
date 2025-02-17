const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Country API',
            version: '1.0.0',
            description: 'API to retrieve countries and their flags',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/countryRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
