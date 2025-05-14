// swaggerSchemas.js
const schemas = {
    Student: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        testsList: { type: 'array', items: { type: 'object' } },
        notes: { type: 'string' },
      },
    },
    Topic: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    },
  };
  
  module.exports = schemas;
  