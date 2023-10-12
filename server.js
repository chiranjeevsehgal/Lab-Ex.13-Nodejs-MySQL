const express = require("express");
const mysql = require('mysql');

require('dotenv').config();

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();


db.connect((err) => {
  if (err) {
    console.error("There is a Database connection error:", err);
  } else {
    console.log("Connected to MySQL database sucessfuly!");
  }
});

// Example route for searching available rooms
app.get("/search-rooms", (req, res) => {
  const { checkInDate, checkOutDate, roomType, occupancy } = req.query;

  const query = `SELECT * FROM rooms`;

  const values = [roomType, occupancy, checkInDate, checkOutDate];

  // Execute the query
  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching rooms." });
    } else {
      // Send the results back to the client
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
