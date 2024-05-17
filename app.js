const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const con = require("./config/connection");
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

// Routes
const auth = require("./routes/auth");
const properties = require("./routes/properties");
const owners = require("./routes/owners");

app.use("/auth", auth);
app.use("/properties", properties);
app.use("/owners", owners);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
