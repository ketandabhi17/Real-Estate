import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const validUser: any = await User.findOne({ email }).exec();
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET as string
    );
    const { password: pass, updatedAt, createdAt, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string
      );
      const { password, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ ...rest, token });
    } else {
      const generatePassword =
        Math.random.toString().slice(-8) + Math.random.toString().slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser: any = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random.toString().slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET as string
      );
      const { password, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ ...rest, token });
    }
  } catch (error: any) {
    console.log(error);
    next();
  }
};
