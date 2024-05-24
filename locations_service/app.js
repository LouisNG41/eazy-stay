const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8002;
const con = require("../config/connection");
const bodyParser = require("body-parser");
const locationRoutes = require("./routes");

// Middleware
app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(locationRoutes);
  
  con.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Connected to locations service!");
    app.listen(port, () => {
      console.log(`Server app listening on port ${port}`);
    });
  });