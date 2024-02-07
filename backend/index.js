import express from "express"
import mongoose from"mongoose"
import dotenv from"dotenv"
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
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

app.use(express.json());


app.listen(3000, () => {
  console.log("server is running");
});


app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err,req,res,next)=>{
    const statusCode= err.statusCode || 500;
    const message =err.message ||'Internal error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})