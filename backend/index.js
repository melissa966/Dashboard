const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//congig dotenv
dotenv.config();

//database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("databse connected");
  })
  .catch((err) => {
    console.log(err);
  });

//server
const app = express();
app.listen(3000, () => {
  console.log("server is running");
});
