// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Define a route to return some data
app.get('/api/data', (req, res) => {
  // Example data (you can replace this with any data you want to return)
  const data = {
    message: 'Hello, this is your Express API!',
    timestamp: new Date()
  };

  // Send the data as JSON
  res.json(data);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
