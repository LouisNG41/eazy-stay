// controller.js
const con = require("../config/connection");

const getUsers = (req, res) => {
  const query = "SELECT * FROM User";
  con.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Internal server error.");
    }
    res.status(200).send(result);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  
  // Add your login logic here (e.g., validate the user with the database)
  
  res.status(200).send("Login endpoint not implemented yet");
};

const signup = (req, res) => {
  const { email, pwd, role } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const query = "INSERT INTO User (email, password, role) VALUES (?,?,?);";
  
  con.query(query, [lowerCaseEmail, pwd, role], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Internal server error.");
    }
    console.log("User registered successfully");
    res.status(200).send("User registered successfully");
  });
};

module.exports = {
  getUsers,
  login,
  signup,
};
