import { Router } from "express";
import * as yup from "yup";
import { IUser } from "../types/user";
import User from "../models/user";
import { CallbackError } from "mongoose";
import jwt from "jsonwebtoken";

const router: Router = Router();

require("dotenv").config();

const yupObjectEmail = yup.object().shape({
  email: yup.string().email().required(),
});
const yupObjectPassword = yup.object().shape({
  password: yup.string().required().min(8).max(30),
});

router.post("/api/register", function (req, res) {
  const { email, password } = req.body;
  if (!yupObjectEmail.validate({ email: email }))
    return res.status(400).send("Error email syntax is invalid");
  else if (!yupObjectPassword.validate({ password: password }))
    return res.status(400).send("Error pasword length must be between 8 & 30 ");
  else {
    const user = new User({ email, password });
    User.findOne(
      { email: user.email },
      function (err: Error, userExisting: IUser) {
        if (userExisting) return res.status(400).send("Error email exists");
        user.save(function (err: CallbackError) {
          if (err) {
            res
              .status(500)
              .send("Error registering new user please try again." + err);
          } else res.status(200).send("Welcome to the club!");
        });
      }
    );
  }
});

router.post("/api/login", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err: Error, user: IUser) {
    if (err) {
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err: Error, same: boolean) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          const payload = { email };
          const token = jwt.sign(payload, process.env.API_KEY as string, {
            expiresIn: "1h",
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

export default router;
