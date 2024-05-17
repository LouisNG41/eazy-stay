const express = require("express");
const router = express.Router();

const con = require("../config/connection");

router.post("/login", (req, res) => {
  const params = req.body;

  const email = params.email.toLowerCase();
  const pwd = params.password;
});

router.post("/signup", (req, res) => {
  const params = req.body;

  const email = params.email.toLowerCase();
  const pwd = params.pwd;
  const role = params.role;

  const query = "INSERT INTO User (email, password, role) VALUES (?,?,?);";
  con.query(query, [email, pwd, role], (err, result) => {
    if (err) throw err;
    console.log("User registered succesfully");
  });
});

module.exports = router;
