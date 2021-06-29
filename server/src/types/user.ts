import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  roles: [string];
  rates: [Map<string, number>];
}
