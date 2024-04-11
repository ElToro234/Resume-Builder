const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('./mydb.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the SQLite database.');
});

const insertSubmission = (data, callback) => {
  const { name, email, mobile, education, activity, occupation, gender, languages, projects } = data;
  const sql = `INSERT INTO submissions (name, email, mobile, education, activity, occupation, gender, languages, projects) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [name, email, mobile, education, activity, occupation, gender, JSON.stringify(languages), projects], function(err) {
    callback(err, { id: this.lastID });
  });
};

const getAllSubmissions = (callback) => {
    const sql = `SELECT * FROM submissions`;

    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};

module.exports = {
    insertSubmission,
    getAllSubmissions,
};
