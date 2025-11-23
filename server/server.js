// server/server.js

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; 
import User from './models/User.js'
import Event from './models/Events.js'
import Profile from './models/Profile.js'
import jwt from 'jsonwebtoken'; import authMiddleware from './middleware/authMiddleware.js'; import dotenv from 'dotenv'; dotenv.config();

//initial setup
connectDB();
const app = express();

// --- Middleware ---
// A middleware to parse incoming JSON data
app.use(cors());
app.use(express.json());

// ROUTES
app.get('/api/users', async (req, res) => {
   console.log("Called GET request for Users collection");
    try {
    //retrieving all documents from User collection  
    const users = await User.find({}); 

    //sendig retrieved data from User collection as a JSON response
    res.status(200).json(users);

  } catch (error) {
    // handling error if database query fails
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users from database', error: error.message });
  }
});

app.post('/api/users', async (req,res) => {
  console.log("Called POST request for Users collection");
  try {
    //get name and email from request body
    const {email, username, password } = req.body;

    //check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists'});
    }

    //create new user instance from model
    const user = new User({
      email,
      username,
      password,
    });

    const createdUser = await user.save();

    //send the newly created user back as a response
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error'});
  }
});

// --- LOGIN ROUTE ---
app.post('/api/login', async (req, res) => {
  console.log("Called POST request for /api/login");
  try {
    const { username, password} = req.body;

    //  Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      // Use a generic message for security
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare plain-text passwords
    // Not secure
    const isMatch = (password === user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //  User is valid, create a JWT token
    const payload = {
      user: {
        userID: user.userID, // Save the user's ID in the token
        username: user.username //save user's username in the token
      }
    };

    // Get the secret from the environment variables
  const JWT_SECRET = process.env.JWT_SECRET; 

  // check if JWT secret is extracted from env file - debugging purpose
  if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    return res.status(500).json({ message: "Server Configuration Error" });
  }

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        // Send the token back to the client
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

//`Event` routes

app.post('/api/events', authMiddleware, async (req,res) => {
  console.log("Called POST request for Events collection");
  try {
    //get name and email from request body
    const { name, category, description, location, date, people } = req.body;

    //check if user already exists
    const eventExists = await Event.findOne({ name });

    if (eventExists) {
      console.log('someone tried to create event with already existing name')
      return res.status(400).json({ message: 'Event already exists'});
    }

    //create new user instance from model
    const event = new Event({
      name,
      category,
      description,
      location,
      date,
      numberPeople: people
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

app.get('/api/events', async (req, res) => {
  console.log("Called GET request for Events collection");  
  try {

    //retrieve all docs in Events collection
    const events = await Event.find({});

    res.status(200).json(events);

  } catch (error) { //error handline
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events from database', error: error.message });
  }
});

app.get('/api/events/:name', async (req, res) => {
  console.log("Called GET request for SPECIFIC Event");
  try {
    const {name} = req.params;
    //check if exists
    const event = await Event.findOne({ name: name});
    if (!event) {
      return res.status(404).json({message: 'Event not found'});
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'});
  }
})

app.patch('/api/events/:id', async (req, res) => {
  console.log("Called PATCH for Event")
  try {
    const { id } = req.params;
    
    const updateData = req.body
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true}
    );

    if (!updatedEvent) {
      return res.status(404).json({message: 'Event not found'});
    }

    res.status(200).json(updatedEvent)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error updating event', error: error.message})
  }
})

app.delete('/api/events/:id', async (req, res) => {
  console.log("Called DELETE for event")
  try {
    const { id } = req.params;

    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({message: 'Event not found'});
    }
    
    res.status(200).json({message: 'Event successfuly deleted', deletedEvent: result})
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error', error: error.message});
  }
})

//`Profile` routes
app.post('/api/profiles', async (req,res) => {
  console.log("Called POST request for Profiles collection");
  try {
    const {
      email,
      username,
      realName,
      savedEvents,
      bio,
      gender,
      location,
      age
    } = req.body;

    if (!email || !username) {
      return res.status(400).json({ message: 'Email and Username are required'});
    }

    const profileExists = await Profile.findOne({ $or: [{ email}, {username}]});
    if (profileExists) {
      return res.status(400).json({ message: 'A profile with this email/username already exists'});
    }

    //create profile object
    const profile = new Profile({
      email,
      username,
      realName,
      savedEvents,
      bio,
      gender,
      location,
      age
    });

    //saving to db
    const createdProfile = await profile.save();
    res.status(201).json(createdProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//get with route parameter (specific username)

app.get('/api/profiles/:username', authMiddleware, async (req, res) => {
  console.log("Called GET request for Profiles collection");
  try {
    //getting username from request parameters (url params)
    const {username} = req.params;

    //check if exists
    const profile = await Profile.findOne({ username: username});

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found'});
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error'});
  }
})


// --- Server Listening ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});