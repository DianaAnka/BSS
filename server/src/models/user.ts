import { IUser } from "../types/user";
import { model, Schema } from "mongoose";
import { hash, compare } from "bcrypt";

const saltRounds = 10;
const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    roles: {
      type: [String],
    },
    rates: {
      type: Map,
      of: { String, Number },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document = this;
    hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});
userSchema.methods.isCorrectPassword = function (password, callback) {
  compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};
export default model<IUser>("User", userSchema);
