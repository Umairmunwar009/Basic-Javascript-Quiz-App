const express = require('express');
const cors = require('cors'); // Import cors
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'Admin.6825',
  database: 'my_database',
  connectTimeout: 30000 // 30 seconds
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

// Endpoint to get questions
app.get('/getQuestions', (req, res) => {
  console.log('Endpoint /getQuestions hit'); // Log to check if endpoint is hit
  const num = req.query.amount || 10;
  const cat = req.query.category || '';
  const diff = req.query.difficulty || '';

  let query = 'SELECT * FROM questions WHERE 1=1';

  if (cat) {
    query += ` AND category = '${cat}'`;
  }
  if (diff) {
    query += ` AND difficulty = '${diff}'`;
  }

  query += ` LIMIT ${num}`;

  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log('Query Results:', results); // Log the results to check
    res.json(results); // Ensure the response is in JSON format
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
