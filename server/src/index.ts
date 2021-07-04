import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import User from "./models/user";
import withAuth from "./middleware";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import * as yup from "yup";

const app = express();
require("dotenv").config();
app.use(json());
app.use(cookieParser());

const yupObjectEmail = yup.object().shape({
  email: yup.string().email().required(),
});
const yupObjectPassword = yup.object().shape({
  password: yup.string().required().min(8).max(30),
});

app.post("/api/register", function (req, res) {
  const { email, password } = req.body;
  if (!yupObjectEmail.validate({ email: email }))
    return res.status(400).send("Error email syntax is invalid");
  else if (!yupObjectPassword.validate({ password: password }))
    return res.status(400).send("Error pasword length must be between 8 & 30 ");
  else {
    const user = new User({ email, password });
    User.findOne({ email: user.email }, function (err: any, userFounded: any) {
      if (userFounded) return res.status(400).send("Error email exits");
      user.save(function (err: any) {
        if (err) {
          res
            .status(500)
            .send("Error registering new user please try again." + err);
        } else res.status(200).send("Welcome to the club!");
      });
    });
  }
});

app.post("/api/authenticate", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err: any, user: any) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err: any, same: any) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
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

//connecting to the database
mongoose.connect(
  "mongodb://localhost:27017/bss",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to database`);
    }
  }
);

//get profile page after being registering
app.get("/api/profile", withAuth, function (req, res) {
  res.send("Welcome back");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
