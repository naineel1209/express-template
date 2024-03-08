import { Request, Response } from "express"
import { LoginUser, RegisterUser } from "../interfaces/authIterface";
import User from "../models/User";
import httpStatus from "http-status";
import errorThrower from "../errors/errorThrower";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config(); //load the environment variables

export const registerUser = async (req: Request, res: Response) =>
{
  //register user
  const { username, password, email, isAdmin }: RegisterUser = req.body;

  //validate the user - check if the user exists
  //if the user exists, throw an error
  //if the user does not exist, create the user

  const user = await User.findOne({ username });

  if (user)
  {
    throw errorThrower(httpStatus.CONFLICT, "User already exists!");
  }

  const newUser = new User({
    username,
    password,
    email,
    isAdmin
  });

  await newUser.save();

  return res.status(httpStatus.CREATED).send({ message: "User created successfully!" });
}

export const loginUser = async (req: Request, res: Response) =>
{
  //login user
  const { username, password }: LoginUser = req.body;

  //validate the user - check if the user exists
  const userExists = await User.userExists(username)

  if (!userExists)
  {
    throw errorThrower(httpStatus.NOT_FOUND, "User not found!");
  }

  //validate the password
  const isPasswordValid = await userExists.validatePassword(password);

  if (!isPasswordValid)
  {
    throw errorThrower(httpStatus.UNAUTHORIZED, "Invalid password!");
  }

  //assign them token
  const accessToken = jwt.sign({ id: userExists._id, username: userExists.username }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  })
  return res.status(httpStatus.OK).send({ message: "User logged in successfully!" });
}

export const logoutUser = async (req: Request, res: Response) =>
{
  res.clearCookie("accessToken");
  return res.status(httpStatus.OK).send({ message: "User logged out successfully!" });
}