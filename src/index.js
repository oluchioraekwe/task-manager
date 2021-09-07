const express = require("express");
require("./db/mongoose");

const userrouter = require("./routers/user");
const taskrouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(userrouter);
app.use(taskrouter);

app.get("", (req, res) => {
  res.send("Welcome to page");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
