// controller.js
const con = require("../config/connection");

const addProperty = (req, res) => {
    const { description, adress, budget, type, photo } = req.body;
    const query = `INSERT INTO Property (description, adress, budget, type, photo) VALUES ("${description}", "${adress}", "${budget}", "${type}", "${photo}");`;
    console.log(query);
    con.query(query, (err, result) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).send("Internal server error.");
      }
  
      console.log("Property registered successfully");
      res.status(200).send("Property registered successfully");
    });
};

const getProperties = (req, res) => {
  const { type, location, minBudget, maxBudget } = req.query;
  let query = "SELECT * FROM property WHERE 1=1";

  if (type) {
    query += ` AND type = "${type}"`;
  }
  if (location) {
    query += ` AND adress LIKE "%${location}%"`;
  }
  if (minBudget) {
    query += ` AND budget >= ${minBudget}`;
  }
  if (maxBudget) {
    query += ` AND budget <= ${maxBudget}`;
  }
  
  con.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Internal server error.");
    }
    res.status(200).send(result);
  });
};


module.exports = {
  getProperties,
  addProperty,
};