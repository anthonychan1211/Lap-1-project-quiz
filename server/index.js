// This code is published under GNU GPL v3.0 License. Copyright 2023 404: Name Not Found (Liskov)
require("dotenv").config();
const app = require("./app");
const port = process.env.PORT;
console.log(port);
app.listen(port, () => {
  console.log(`API listening on port ${port}.`);
});
