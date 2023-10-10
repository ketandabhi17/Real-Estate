import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import path from "path";
import cookieParser from "cookie-parser";

const cors = require("cors");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "client", "dist", "index.html"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.get("/", (req: Request, res: Response) => {
  res.send("fasjkdhfasdj");
});
