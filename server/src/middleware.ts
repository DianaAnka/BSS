import * as express from "express";

const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.API_KEY;
interface MulterRequest extends express.Request {
  email: any;
}
const withAuth = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function (err: any, decoded: any) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        (req as MulterRequest).email = decoded.email;
        next();
      }
    });
  }
};
module.exports = withAuth;
