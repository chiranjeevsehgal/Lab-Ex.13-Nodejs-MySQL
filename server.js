var mysql = require('mysql');
require('dotenv').config();
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

connection.query(
  'create table crud_stud(id int,name varchar(255));',
  function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  }
);

// connection.query(
//   'select * from crud_student;',
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   }
// );

connection.end();
