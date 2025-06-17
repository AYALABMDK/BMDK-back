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
      notes: { type: 'string' }
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
  },
  Lessons: {
    type: 'object',
    properties: {
      code: { type: 'integer' },
      topicCode: { type: 'integer' },
      description: { type: 'string' },
      city: { type: 'string' },
      day: { type: 'string' },
      hour: { type: 'string' },
      status: { type: 'string' },
      studentsCount: { type: 'integer' },
      studentsType: { type: 'string' },
      price: { type: 'number' },
      startDate: { type: 'string', format: 'date' },
      endDate: { type: 'string', format: 'date' },
      notes: { type: 'string' }
    },
    required: ['code', 'topicCode', 'description', 'city', 'day', 'hour', 'status']
  },
  Videos: {
    type: 'object',
    properties: {
      code: { type: 'integer' },
      topicCode: { type: 'integer' },
      topicPart: { type: 'string' },
      signsTopic: { type: 'string' },
      price: { type: 'number' },
      sold: { type: 'integer' },
      videoExUrl: { type: 'string' },
      notes: { type: 'string' }
    },
    required: ['code', 'topicCode', 'topicPart', 'signsTopic', 'price', 'sold']
  },
  Orders: {
    type: 'object',
    properties: {
      orderCode: { type: 'integer' },
      studentCode: { type: 'integer' },
      address: {
        type: 'object',
        properties: {
          city: { type: 'string' },
          street: { type: 'string' }
        },
        required: ['city', 'street']
      },
      fullName: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      status: { type: 'string' },
      products: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            bookCode: { type: 'string' },
            videoCode: { type: 'integer' },
            size: { type: 'string' },
            quantity: { type: 'integer' },
            price: { type: 'number' }
          },
          required: ['price', 'quantity']
        }
      }
    },
    required: ['orderCode', 'address', 'fullName', 'email', 'phone', 'status', 'products']
  }
};

module.exports = schemas;