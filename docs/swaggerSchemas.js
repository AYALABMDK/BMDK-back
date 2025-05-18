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
    },
    StudentLessons: {
      type: 'object',
      properties: {
        studentCode: { type: 'integer' },
        lessonCode: { type: 'integer' },
      },
      required: ['studentCode', 'lessonCode'],
    },
    Tests: {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        topicId: { type: 'integer' },
        topicPart: { type: 'string' },
        signs: { type: 'string' },
        content: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              code: { type: 'integer' },
              question: { type: 'string' },
              answerList: {
                type: 'array',
                items: { type: 'string' }
              },
              correctAnswer: { type: 'integer' },
              score: { type: 'integer' }
            },
            required: ['code', 'question', 'answerList', 'correctAnswer', 'score']
          }
        }
      },
      required: ['code', 'topicId', 'topicPart', 'signs', 'content']
    }        
  };
  
  module.exports = schemas;
  