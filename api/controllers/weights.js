import { db } from "../connect.js";


export const createWeight = (req, res) => {
  console.log(req.body)
  const { userId, weight, date } = req.body;
  const query = `INSERT INTO weights (userId, weight, date) VALUES (?, ?, ?)`;
  db.query(query, [userId, weight, date], (err, result) => {
    if (err) throw err;
    res.send("Weight entry created successfully!");
  });
};


export const getAllWeights = (req, res) => {
  const { userId } = req.params; 
  console.log(userId)
  const query = `SELECT weight FROM weights WHERE userId = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) throw err;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    const weights = result.map(item => item.weight);
    res.send(weights);
  });
};





export const updateWeight = (req, res) => {
  const { weight_id } = req.params;
  const { weight } = req.body;
  const query = `UPDATE weights SET weight = ? WHERE id = ?`;
  db.query(query, [weight, weight_id], (err, result) => {
    if (
      err) throw err;
    res.send("Weight entry updated successfully!");
  });
};


export const deleteWeight = (req, res) => {
  const { weight_id } = req.params;
  const query = `DELETE FROM weights WHERE id = ?`;
  db.query(query, [weight_id], (err, result) => {
    if (err) throw err;
    res.send("Weight entry deleted successfully!");
  });
};
