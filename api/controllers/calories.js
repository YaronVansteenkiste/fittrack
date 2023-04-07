import { db } from "../connect.js";

export const createCalories = (req, res) => {
  const { userId, currentCalories, requiredCalories} = req.body;
  const query = 'INSERT INTO calories (userId, currentCalories, requiredCalories) VALUES (?, ?, ?)';
  db.query(query, [userId, currentCalories, requiredCalories], (err, result)=> {
    if (err) throw err;
    res.send("Calories entry created successfully!");
  })
}

export const updateCurrentCalories = (req, res) => {
  const { userId } = req.params;
  const { currentCalories } = req.body;
  const query = 'UPDATE calories SET currentCalories = ? WHERE userId = ?';
  console.log(req.params, req.body)
  db.query (query, [userId, currentCalories], (err, result) => {
    if (
      err) throw err;
    res.send("currentCalories entry updated!")
  });
}

export const updateRequiredCalories = (req, res) => {
  const { userId } = req.params;
  const { requiredCalories } = req.body;
  const query = 'UPDATE calories SET requiredCalories = ? WHERE userId = ?';
  console.log(req.params, req.body)
  db.query (query, [userId, requiredCalories], (err, result) => {
    if (
      err) throw err;
    res.send("requiredCalories entry updated!")
  });
}


export const getCurrentCalories = (req, res) => {
  const { userId } = req.params;
  const query = `SELECT currentCalories FROM calories WHERE userId = ?`;
  db.query (query, [userId], (err, result) => {
    if (
      err) throw err;
      const currentCalories = result.map(item => item.currentCalories);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.send(currentCalories);
  });
}

export const getRequiredCalories = (req, res) => {
  const { userId } = req.params;
  const query = `SELECT requiredCalories FROM calories WHERE userId = ?`;
  db.query (query, [userId], (err, result) => {
    if (
      err) throw err;
      const requiredCalories = result.map(item => item.requiredCalories);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.send(requiredCalories);
  });
}