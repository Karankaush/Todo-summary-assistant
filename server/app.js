require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const summarizeRoutes = require('./routes/summarize');

const app = express();

// Connect to database
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);
app.use('/summarize', summarizeRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Internal Server Error' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});