// Load environment variables from .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const mongoose = require('mongoose');

// Import Swagger files
const { swaggerSpec, swaggerUi } = require('./docs/swagger');

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    // Get the native MongoDB database object from Mongoose
    const db = mongoose.connection.db;

    // List all collections currently in the database
    const collections = await db.listCollections().toArray();
    console.log('📦 Collections in current database:');
    collections.forEach(col => console.log(' -', col.name));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// Swagger route to serve documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple health check route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Topic routes
const topicRoutes = require('./routes/topicRoutes');
app.use('/topic', topicRoutes);

// Students routes
const studentsRoutes = require('./routes/studentsRoutes');
app.use('/students', studentsRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
