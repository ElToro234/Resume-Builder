const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Importing database.js
const app = express();

const PORT = process.env.PORT || 3006;
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
    console.log('Received data from insertion:', req.body);  // Log the incoming data
    db.insertSubmission(req.body, (err, result) => {
        if (err) {
            console.error('Detailed error:', err);
            res.status(500).send('Error inserting data into the database');
        } else {
            res.status(201).send('Data inserted successfully');
        }
    });
  });

  app.delete('/database', (req, res) => {
    const { id } = req.params;  // Get the ID from the URL parameter
    deleteSubmission(id, (err, result) => {
      if (err) {
        console.error('Error deleting submission:', err);
        res.status(500).send('Error deleting data from the database');
      } else if (result.affectedRows === 0) { // This check might vary depending on the database
        res.status(404).send('No submission found with that ID');
      } else {
        res.status(200).send('Submission deleted successfully');
      }
    });
  });

  app.post('/signup', (req, res) => {
    console.log('Signup request received:', req.body);
    const { email, password } = req.body;

    db.getUserByEmail(email, (err, user) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Database error');
            return;
        }

        if (user) {
            res.send('exist');
        } else {
            db.insertUser({ email, password }, (err) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).send('Database error');
                    return;
                }
                res.send('notexist');
            });
        }
    });
});

  function deleteSubmission(submissionId, callback) {
    const query = 'DELETE FROM submissions WHERE id = ?';
    db.query(query, [submissionId], function(err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }

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