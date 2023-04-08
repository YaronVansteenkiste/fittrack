import { db } from "../connect.js";

export const createActivity = (req, res) => {
  const { id, activity, userId} = req.body;
  const query = 'INSERT INTO activity (id, activity, userId) VALUES (?, ?, ?)';
  db.query(query, [id, activity, userId], (err, result)=> {
    if (err) throw err;
    res.send("Activity entry created successfully!");
  })
}


export const getAllActivities = (req, res) => {
  const { userId } = req.params; 
  const query = `SELECT activity FROM activity WHERE userId = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) throw err;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    const activity = result.map(item => item.activity);
    res.send(activity);
  });
};





export const updateActivity = (req, res) => {
  const { activity_id } = req.params;
  const { activity } = req.body;
  const query = `UPDATE activity SET activity = ? WHERE id = ?`;
  db.query(query, [activity, activity_id], (err, result) => {
    if (
      err) throw err;
    res.send("Activity entry updated successfully!");
  });
};


export const deleteActivity = (req, res) => {
  const { activity_id } = req.params;
  const query = `DELETE FROM activity WHERE id = ?`;
  db.query(query, [activity_id], (err, result) => {
    if (err) throw err;
    res.send("Activity entry deleted successfully!");
  });
};
