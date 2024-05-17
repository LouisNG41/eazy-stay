const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "agence_immo",
});

module.exports = con;
