import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashPassword =  bcryptjs.hashSync(password,10)
  try {
    const newUser = new User({ username, email, password: hashPassword});
    await newUser.save();
    res.json("Success");
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "An error occurred while signing up" });
  }
};
