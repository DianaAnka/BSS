import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import User from "./models/user";

const app = express();
const secret = "mysecretsshhh";
const withAuth = require("./middleware");
app.use(json());
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//register route
app.post("/api/register", function (req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function (err) {
    if (err) {
      res
        .status(500)
        .send("Error registering new user please try again." + err);
    } else {
      const payload = { email };
      const token = jwt.sign(payload, secret, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true }).sendStatus(200);
    }
  });
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
          const token = jwt.sign(payload, secret, {
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
