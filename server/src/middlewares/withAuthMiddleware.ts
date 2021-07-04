import * as express from "express";
import jwt from "jsonwebtoken";

require("dotenv").config();
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
    jwt.verify(
      token,
      process.env.API_KEY as string,
      function (err: any, decoded: any) {
        if (err) {
          res.status(401).send("Unauthorized: Invalid token");
        } else {
          (req as MulterRequest).email = decoded.email;
          next();
        }
      }
    );
  }
};
export default withAuth;
