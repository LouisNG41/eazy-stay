const express = require("express");
const router = express.Router();

const crypto = require("crypto");
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

  const query = "INSERT INTO User (email, password, admin) VALUES (?,?,?);";
  con.query(query, [email, pwd, false], (err, result) => {
    if (err) throw err;
    console.log("User registered succesfully");
  });
});

module.exports = router;
