require("dotenv").config();
const express = require("express");
const app = express();
const keys = require("./config/keys");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

//Allow cross domains
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

const db = keys.databaseURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routing
const api = require("./api/routes");
app.use("/api", api);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on Port " + PORT);
});
