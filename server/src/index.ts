import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

import withAuth from "./middlewares/withAuthMiddleware";

import cookieParser from "cookie-parser";
import router from "./routes";

const app = express();
app.use(json());
app.use(cookieParser());
app.use("/", router);
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
      app.listen(5000, () => {
        console.log("server is listening on port 5000");
      });
    }
  }
);

app.get("/api/profile", withAuth, function (req, res) {
  res.send("Welcome back");
});
