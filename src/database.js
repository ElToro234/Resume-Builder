const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database("./data/mydb.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
        }
        console.log('Connected to the SQLite database.');
        // initializeDB();
    });
    db.run(`CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        mobile TEXT,
        education TEXT,
        activity TEXT,
        occupation TEXT,
        gender TEXT,
        languages TEXT,
        projects TEXT
    )`, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
    
const insertSubmission = (data, callback) => {
    const { name, email, mobile, education, activity, occupation, gender, languages, projects } = data;
    if (!name || !email || !mobile) { // Check for required fields
        return callback(new Error('Missing required fields'), null);
    }

    const sql = `INSERT INTO submissions (name, email, mobile, education, activity, occupation, gender, languages, projects) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [name, email, mobile, education, activity, occupation, gender, JSON.stringify(languages), projects], function(err) {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id: this.lastID });
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
    
    //Creating the table
    // db.run(
    //     `CREATE TABLE resume(name, email, mobile, education, activity, occupation, gender, languages, projects)`
    // );

        
 
// const path = require('path');
// const fs = require('fs');

// // Correctly defining the path to your database file
// const dbDir = path.join(__dirname, 'data');
// if (!fs.existsSync(dbDir)){
//     fs.mkdirSync(dbDir, { recursive: true });
// }

// const dbPath = path.resolve(dbDir, 'mydb.db');

// function initializeDB() {
//     const sqlCreateTable = `
//     CREATE TABLE submissions (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         email TEXT NOT NULL,
//         mobile TEXT,
//         education TEXT,
//         activity TEXT,
//         occupation TEXT,
//         gender TEXT,
//         languages TEXT,
//         projects TEXT
//     );`;
//     db.run(sqlCreateTable, function(err) {
//         if (err) {
//             console.error('Error creating table:', err.message);
//         } else {
//             console.log('Table created or already exists');
//         }
//     });
// }

