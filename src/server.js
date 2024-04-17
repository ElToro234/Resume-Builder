const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Importing database.js
const app = express();

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
app.use(cors());
app.use(bodyParser.json());

 // Define routes that use db functions
 app.get('/database', (req, res) => {
  db.getAllSubmissions((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data from the database');
    } else {
      res.json(data);
    }
  });
});

app.post('/database', (req, res) => {
    db.insertData(req.body, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data into the database');
      } else {
        res.status(201).send('Data inserted successfully');
      }
    });
  });

  function startServer(port) {
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use. Trying port ${port + 1}...`);
        startServer(port + 1);  // Recursively try the next port
      } else {
        console.error('Error starting server:', err);
        process.exit(1);  // Exit if server can't start
      }
    });
  
    return server;
  }
  
  // Start the server with the initial port
  startServer(PORT);