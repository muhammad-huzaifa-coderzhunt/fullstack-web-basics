const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/usersDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  // Note: In a real application, you should hash passwords.
  password: String
});

const User = mongoose.model('User', userSchema);

// API Endpoints

// POST /api/v1/users - Create a new user (Signup)
app.post('/api/v1/users', async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/v1/users - Get all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/v1/users - Delete all users
app.delete('/api/v1/users', async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: 'All users deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/v1/users/:id - Get a single user by ID
app.get('/api/v1/users/:id', getUser, (req, res) => {
  res.json(res.user);
});

// PUT /api/v1/users/:id - Update a user by ID
app.put('/api/v1/users/:id', getUser, async (req, res) => {
    if (req.body.firstName != null) {
        res.user.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
        res.user.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// PATCH /api/v1/users/:id - Partially update a user by ID
app.patch('/api/v1/users/:id', getUser, async (req, res) => {
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/v1/users/:id - Delete a user by ID
app.delete('/api/v1/users/:id', getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

// POST /api/v1/login - User login (Signin)
app.post('/api/v1/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        // In a real app, compare hashed passwords
        if (req.body.password === user.password) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'signup.html'));
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
