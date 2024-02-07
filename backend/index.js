import express from "express"
import mongoose from"mongoose"
import dotenv from"dotenv"
import userRoute from "./routes/userRoute.js";
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


app.use('/api/user', userRoute);