const express = require("express");
const router = express.Router();
const con = require("../config/connection");

router.get("/", (req, res) => {
  const query = "SELECT * from Property;";
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/add-property", (req, res) => {
  const {desc, adress, budget, type, photo} = req.body;
  const query = `INSERT INTO Logement (desc, adress, budget, type, photo) VALUES ("${desc}", "${adress}", "${budget}", "${type}", "${photo}");`;
  con.query(query, (err, result) => {
    if (err) throw err;
    console.log("Property registered succesfully");
  });
});

module.exports = router;
