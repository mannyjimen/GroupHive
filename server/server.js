// server/server.js

import express from 'express';
import connectDB from './config/db.js'; 
import User from './models/User.js'

//initial setup
connectDB();
const app = express();

// --- Middleware ---
// A middleware to parse incoming JSON data
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

app.post('/api/users', async (req,res) => {
  try {
    //get name and email from request body
    const { name, email } = req.body;

    //check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists'});
    }

    //create new user instance from model
    const user = new User({
      name,
      email,
    });

    const createdUser = await user.save();

    //send the newly created user back as a response
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error'});
  }
});



// --- Server Listening ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});