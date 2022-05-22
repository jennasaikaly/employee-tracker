const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'rootpass',
      database: 'Employees'
    },
    console.log("Connected to the 'Employees' database.")
  );

  module.exports = db;