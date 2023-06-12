const express = require("express");
const app = express();
const data = require("./data.json");
app.use(express.json());
const port = 3000;
app.get("/", (req, res) => {
  res.send(data);
});
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
