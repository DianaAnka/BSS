import { Document } from "mongoose";

export interface IUser extends Document {
  isCorrectPassword(password: any, arg1: (err: Error, same: any) => void): any;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  roles: [string];
  rates: Map<string, number>;
}
