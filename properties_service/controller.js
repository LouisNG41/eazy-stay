// controller.js
const con = require("../config/connection");

const getProperties = (req, res) => {
  const query = "SELECT * from Property;";
  con.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Internal server error.");
    }
    res.status(200).send(result);
  });
};

const addProperty = (req, res) => {
    const { desc, adress, budget, type, photo } = req.body;
    const query = `INSERT INTO Property (desc, adress, budget, type, photo) VALUES ("${desc}", "${adress}", "${budget}", "${type}", "${photo}");`;
    con.query(query, (err, result) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).send("Internal server error.");
      }
  
      console.log("Property registered successfully");
      res.status(200).send("Property registered successfully");
    });
};

module.exports = {
  getProperties,
  addProperty
};