import bcryptjs from "bcryptjs";
import User from "../models/UserModel.js";

import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "Tous les champs sont obligatoires"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      next(errorHandler(404, "Utilisateur non trouvé"));
    }

    const validPassword = bcryptjs.compare(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Mot de passe invalide"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
