import { IUser } from "../types/user";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: Boolean,
      required: true,
    },
    profilePic: {
      type: Boolean,
    },
    roles: {
      type: [String],
      required: true,
    },
    rates: {
      type: Map,
      of: { String, Number },
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
