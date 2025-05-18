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
    Books: {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        topicCode: { type: 'integer' },
        signs: { type: 'string' },
        signsTopic: { type: 'string' },
        bigBooksQuantity: { type: 'integer' },
        smallBooksQuantity: { type: 'integer' },
        bigBooksSold: { type: 'integer' },
        smallBooksSold: { type: 'integer' },
        bigBookPrice: { type: 'integer' },
        smallBookPrice: { type: 'integer' },
        notes: { type: 'string' }
      },
      required: ['code', 'topicCode', 'signs', 'signsTopic']
    }    
  };
  
  module.exports = schemas;
  