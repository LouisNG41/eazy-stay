const express = require("express");
const router = express.Router();
const con = require("../config/connection");

router.get("/", (req, res) => {
  const query = "SELECT * FROM User";
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
