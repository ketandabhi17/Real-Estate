import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
const cors = require("cors");
dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("fasjkdhfasdj");
});
