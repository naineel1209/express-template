import { Document, Model } from "mongoose";

interface User
{
  username: string;
  password: string;
  email: string;
  profilePic?: string;
  isAdmin: boolean;
  validatePassword: (password: string) => Promise<boolean>;
}

export type UserDocument = User & Document;
export type UserModel = Model<UserDocument> & {
  userExists: (username: string) => Promise<UserDocument | null>;
};