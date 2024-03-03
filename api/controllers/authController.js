import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return next(createError(401, "Invalid password"));

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );
    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};
