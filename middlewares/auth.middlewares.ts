import { NextFunction, Request, Response } from "express";
import errorThrower from "../errors/errorThrower";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config(); //load the environment variables

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) =>
{
  try
  {
    const { accessToken } = req.cookies;

    if (!accessToken)
    {
      throw new Error("You are not authenticated!");
    }

    const isVerified = jwt.verify(accessToken, process.env.JWT_SECRET as string);

    if (!isVerified)
    {
      throw new Error("You are not authenticated!");
    }

    next();
  } catch (err)
  {
    throw errorThrower(httpStatus.UNAUTHORIZED, err.message);
  }
}