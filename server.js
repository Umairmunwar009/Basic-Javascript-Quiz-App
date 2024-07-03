const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
  user: 'admin',
  password: 'Admin.6825',
  database: 'my_database',
  connectTimeout: 30000 
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

// Endpoint to get questions
app.get('/getQuestions', (req, res) => {
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
    return res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
