const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});

// GET endpoint to fetch an item
app.get('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const query = req.query.q;

  res.send({
    itemId: itemId,
    query: query,
  });
});

// POST endpoint to create an item
app.post('/items', (req, res) => {
  const { name, description, price, tax } = req.body;

  res.send({
    name: name,
    description: description,
    price: price,
    tax: tax,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
