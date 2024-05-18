const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
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
  if (err) throw err;
  console.log("Connected!");
  app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
  });
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM User";
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/login", (req, res) => {
  const params = req.body;

  const email = params.email.toLowerCase();
  const pwd = params.password;
});

app.post("/signup", (req, res) => {
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
