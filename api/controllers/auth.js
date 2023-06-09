import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  console.log(req.body)

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`,`email`,`password`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};


export const modifyBio = (req, res) => {
  const { id, userbio } = req.body;
  console.log('Request Body:', req.body);

  const q = "UPDATE users SET userbio = ? WHERE id = ?";
  console.log('SQL Query:', q);

  db.query(q, [userbio, id], (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ userbio: userbio });
  });
};


export const getColors = (req, res) => {
  const userId  = req.query.id;

  db.query(
    'SELECT bgcolor1, bgcolor2 FROM users WHERE id = ?',
    [userId],
    (error, results) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Check if both colors are empty and provide default values if necessary
        if (!results[0].bgcolor1 && !results[0].bgcolor2) {
          results[0].bgcolor1 = '#25d5bd';
          results[0].bgcolor2 = '#9198e5';
        }
        
        // Send the profile colors as the API response
        res.json(results[0]);
      }
    }
  );
};

export const updateColors = (req, res) => {
  const { bgcolor1, bgcolor2 } = req.body;
  const userId  = req.query.id;

  db.query(
    'UPDATE users SET bgcolor1 = ?, bgcolor2 = ? WHERE id = ?',
    [bgcolor1, bgcolor2, userId],
    (error, results) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Profile colors updated successfully' });
      }
    }
  );
};


