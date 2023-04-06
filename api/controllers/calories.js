import express from 'express';
import { db } from '../connect.js';

const router = express.Router();

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM calories WHERE user_id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching calorie measurements for user');
    } else {
      res.json(result);
    }
  });
});

// add a new calorie measurement for a user
router.post('/', (req, res) => {
  const { user_id, amount, date } = req.body;
  const query = 'INSERT INTO calories (user_id, amount, date) VALUES (?, ?, ?)';

  db.query(query, [user_id, amount, date], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding calorie measurement for user');
    } else {
      res.status(201).send('Calorie measurement added successfully');
    }
  });
});

export default router;
