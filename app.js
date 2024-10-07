const express = require('express');
const mongoose = require('mongoose');
const characterRouter = require('./routes/characters'); // Assuming it's in the routes folder
const Item = require('./models/item'); // Item model

const app = express();
const port = 3000;


// Middleware to parse JSON bodies
app.use(express.json()); // This line must come before the routes

// Root endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});

// GET endpoint to fetch all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET endpoint to fetch an item by its ID
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET endpoint to fetch an item by its code
app.get('/items/code/:code', async (req, res) => {
  try {
    const item = await Item.findOne({ code: req.params.code });
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// POST endpoint to create an item
app.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);  // Create a new item with the request body
    await item.save();  // Save the item to the database
    res.status(201).send(item);  // Send back the saved item
  } catch (error) {
    res.status(500).send({ message: error.message });  // Catch any errors
  }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/game', {useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Use the character router
app.use('/characters', characterRouter);

// Start the server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
