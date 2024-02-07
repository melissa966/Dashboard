import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fileds are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);
  try {
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.json("Success");
  } catch (error) {
    console.error("Error in signup:", error);
    next(error);
  }
};
