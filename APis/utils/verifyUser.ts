// import jwt from "jsonwebtoken";
// import { errorHandler } from "./error";
// import { NextFunction, Request, Response } from "express";
// const dotenv = require("dotenv");

// export const verifyToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   dotenv.config();
//   const token = req.cookies.access_token;

//   if (!token) return next(errorHandler(401, "Unauthorized"));

//   jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
//     if (err) return next(errorHandler(403, "Forbidden"));

//     req.user = user;
//     next();
//   });
// };

import jwt from "jsonwebtoken";
import { errorHandler } from "./error";
import { NextFunction, Request, Response } from "express";
const dotenv = require("dotenv");

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user: any; // Adjust the type as needed
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  dotenv.config();
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};
