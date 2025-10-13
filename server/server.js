// server/server.js

import express from 'express';
import connectDB from './config/db.js'; 
import User from './models/User.js'
import Event from './models/Events.js'

//initial setup
connectDB();
const app = express();

// --- Middleware ---
// A middleware to parse incoming JSON data
app.use(express.json());

// ROUTES
app.get('/api/users', async (req, res) => {
   console.log("Called GET request for Users collection");
    try {
    // 1. Query the database using the Mongoose model
    // .find({}) retrieves all documents in the User collection
    const users = await User.find({});

    // 2. Send the retrieved data (users) as a JSON response
    // The status 200 (OK) is implicit but good practice to include
    res.status(200).json(users);

  } catch (error) {
    // 3. Handle errors if the database query fails
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users from database', error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  console.log("Called POST request for Events collection");  
  try {

    //retrieve all docs in Events collection
    const events = await Event.find({});

    // 2. Send the retrieved data (users) as a JSON response
    // The status 200 (OK) is implicit but good practice to include
    res.status(200).json(events);

  } catch (error) {
    // 3. Handle errors if the database query fails
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events from database', error: error.message });
  }
});

app.post('/api/users', async (req,res) => {
  console.log("Called POST request for Users collection");
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

app.post('/api/events', async (req,res) => {
  console.log("Called POST request for Events collection");
  try {
    //get name and email from request body
    const { name, category, description, location, numberPeople } = req.body;

    //check if user already exists
    const eventExists = await Event.findOne({ name });

    if (eventExists) {
      return res.status(400).json({ message: 'Event already exists'});
    }

    //create new user instance from model
    const event = new Event({
      name,
      category,
      description,
      location,
      numberPeople
    });

    console.log("created event")

    const createdEvent = await event.save();

    //send the newly created user back as a response
    res.status(201).json(createdEvent);
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