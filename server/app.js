const express = require("express");
const app = express();
const data = require("./data.json");
const cors = require('cors');
const logger = require("./logger");

app.use(cors());
app.use(express.json());
app.use(logger);


app.get("/", (req, res) => {
  res.send(data);
});

module.exports = app;
