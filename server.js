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
  const amount = req.query.amount || 5;
  const category = req.query.category || '';
  const difficulty = req.query.difficulty || '';

  let query = `
      SELECT 
          q.category, 
          o.option_text AS correct_answer, 
          q.difficulty, 
          GROUP_CONCAT(inc.option_text) AS incorrect_answers, 
          q.question_text AS question
      FROM 
          questions q
      JOIN 
          options o ON q.question_id = o.question_id AND o.is_correct = 1
      JOIN 
          options inc ON q.question_id = inc.question_id AND inc.is_correct = 0
  `;

  let conditions = [];
  if (category) {
      conditions.push(`q.category = ${connection.escape(category)}`);
  }
  if (difficulty) {
      conditions.push(`q.difficulty = ${connection.escape(difficulty)}`);
  }

  if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' GROUP BY q.question_id, q.category, o.option_text, q.difficulty, q.question_text LIMIT ?';
console.log('query>',)
  connection.query(query, [parseInt(amount)], (error, results) => {
      if (error) {
          return res.status(500).json({ error: error.message });
      }
      res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

