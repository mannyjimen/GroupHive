// server/server.js

import express from 'express';
import connectDB from './config/db.js'; // Notice the .js extension is often needed in ES Modules

// --- Initial Setup ---
// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// --- Middleware ---
// A middleware to parse incoming JSON data
app.use(express.json());

// --- Routes ---
// A simple test route to make sure the server is working
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

// --- Server Listening ---
// Get the port from environment variables, with a default of 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});