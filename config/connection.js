const mysql = require('mysql2');
//const mysql = require('mysql2/promise');
// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'rootpass',
      database: 'employeeTracker'
    },
    console.log("Connected to the 'employeeTracker' database.")
  );

  module.exports = connection;