const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const bookRouter = require("./book.router");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected to MongoDB database!"))
  .catch((err) => console.log("Error connecting to database: " + err));

app.use("/", bookRouter);

const port = 8080;
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
