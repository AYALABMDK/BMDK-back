// Load environment variables from .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const mongoose = require('mongoose');

// Import Swagger files
const { swaggerSpec, swaggerUi } = require('./docs/swagger');

// Initialize the Express application
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());


//cors
const cors = require('cors');

app.use(cors({
  origin: 'https://bmdk.netlify.app/',  // או '*', אם את רק מפתחת
  credentials: true // חשוב בשביל לשלוח עוגיות
}));

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
app.use('/topics', topicRoutes);

// Students routes
const studentsRoutes = require('./routes/studentsRoutes');
app.use('/students', studentsRoutes);

// Books routes
const booksRoutes = require('./routes/booksRoutes');
app.use('/books', booksRoutes);

// Videos routes
const videoRoutes = require('./routes/videoRoutes');
app.use('/videos', videoRoutes);

// StudentLessons routes
const studentLessonsRoutes = require('./routes/studentLessonsRoutes');
app.use('/studentLessons', studentLessonsRoutes);

// Tests routes
const testsRoutes = require('./routes/testsRoutes');
app.use('/tests', testsRoutes);

// Lessons routes
const lessonsRoutes = require('./routes/lessonsRouter')
app.use('/lessons', lessonsRoutes);

// Orders routes
const ordersRoutes = require('./routes/ordersRoutes');
app.use('/orders',ordersRoutes)

// Contact routes (email sending)
const contactRoutes = require('./routes/contactRoutes');
app.use('/contact', contactRoutes);

// Admin routes
const adminRouter = require('./routes/adminRoutes');
app.use('/admin', adminRouter);



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
