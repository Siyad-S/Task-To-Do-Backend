const express = require("express");
const app = express();
const port = 4000;
const connectDb = require("./configs/dbConnection");
const cors = require("cors");

connectDb();

app.use(cors());
app.use(express.json());
app.use("/tasks", require("./router/toDo"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
