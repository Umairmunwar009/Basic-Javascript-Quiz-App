const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(cors());

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

app.get('/getQuestions', (req, res) => {
  const amount = req.query.amount || 5;
  const category = req.query.category || '';
  const difficulty = req.query.difficulty || '';

  let query = `
    SELECT 
        q.category, 
        JSON_ARRAYAGG(CASE WHEN o.is_correct = 1 THEN o.option_text ELSE NULL END) AS correct_answers, 
        q.difficulty, 
        JSON_ARRAYAGG(CASE WHEN o.is_correct = 0 THEN o.option_text ELSE NULL END) AS incorrect_answers, 
        q.question_text AS question
    FROM 
        questions q
    JOIN 
        options o ON q.question_id = o.question_id
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

  query += ' GROUP BY q.question_id, q.category, q.difficulty, q.question_text LIMIT ?';

  connection.query(query, [parseInt(amount)], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Filter out null values
    const filteredResults = results.map(result => ({
      ...result,
      correct_answers: JSON.parse(result.correct_answers).filter(answer => answer !== null),
      incorrect_answers: JSON.parse(result.incorrect_answers).filter(answer => answer !== null)
    }));

    res.json(filteredResults);
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
