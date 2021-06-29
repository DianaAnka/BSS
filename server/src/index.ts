import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(json());

mongoose.connect(
  "mongodb://localhost:27017/bss",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database");
  }
);
app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
