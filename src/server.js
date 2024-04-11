const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Importing database.js
const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
app.use(cors());
app.use(bodyParser.json());

 // Define routes that use db functions
app.get('/database', (req, res) => {
  db.fetchData((err, data) => {
  });
});

app.post('/database', (req, res) => {
    db.insertData(req.body, (err, result) => {
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;