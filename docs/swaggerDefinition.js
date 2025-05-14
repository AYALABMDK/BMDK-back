// swaggerDefinition.js
const schemas = require('./swaggerSchemas');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for your project',
  },
  servers: [
    {
      url: 'http://localhost:4000',
    },
  ],
  components: {
    schemas,
  },
};

module.exports = swaggerDefinition;
