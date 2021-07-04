import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import User from "./models/user";
import withAuth from "./middleware";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
require("dotenv").config();
app.use(json());
app.use(cookieParser());

//to check if email syntax is valid
function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

//to check password length
function validatePassword(password: string) {
  if (password.length >= 8 && password.length <= 30) return true;
  return false;
}

//register route
app.post("/api/register", function (req, res) {
  const { email, password } = req.body;
  if (!validateEmail(email))
    return res.status(400).send("Error email syntax is invalid");
  else if (!validatePassword(password))
    return res.status(400).send("Error pasword length must be between 8 & 30 ");
  else {
    const user = new User({ email, password });
    User.findOne({ email: user.email }, function (err: any, userFounded: any) {
      if (userFounded)
        return res.status(400).json({ auth: false, message: "email exits" });
      user.save(function (err: any) {
        if (err) {
          res
            .status(500)
            .send("Error registering new user please try again." + err);
        } else {
          // const payload = { email };
          // const token = jwt.sign(payload, secret, {
          //   expiresIn: "1h",
          // });
          // res.cookie("token", token, { httpOnly: true }).sendStatus(200);
          res.status(200).send("Welcome to the club!");
        }
      });
    });
  }
});

//authentication route
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
