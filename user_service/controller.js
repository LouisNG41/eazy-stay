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

const getUserById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM User WHERE idUser = ?";
  con.query(query, [id], (err, result) => {
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
  const query = "SELECT * FROM User WHERE email = ? AND password = ?";
  
  con.query(query, [lowerCaseEmail, password], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Internal server error.");
    }
    if (result.length > 0) {
      res.status(200).send("Bien connecté");
    } else {
      res.status(401).send("Erreur");
    }
  });

};

const signup = (req, res) => {
  const { email, firstName, lastName, password, role } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const query = "INSERT INTO User (email, firstName, lastName, password, role) VALUES (?,?,?,?,?);";
  
  con.query(query, [lowerCaseEmail, firstName, lastName, password, role], (err, result) => {
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
  getUserById,
  login,
  signup,
};
