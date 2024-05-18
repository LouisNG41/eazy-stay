const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8001;
const con = require("../config/connection");
const bodyParser = require("body-parser");

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
  });
});

app.get("/properties", (req, res) => {
  const query = "SELECT * from Property;";
  con.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).send("Internal server error.");
    }
    res.status(200).send(result);
  });
});

app.post("/add-property", (req, res) => {
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
});
