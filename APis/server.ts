import express, { Request, Response } from "express";
const cors = require("cors");

const app = express();

app.use(express.json());

app.listen(7000, () => {
  console.log("Server is listening on port: 7000");
});

app.use(cors({ origin: "http://localhost:5173" }));
app.get("/", (req: Request, res: Response) => {
  res.send("fasjkdhfasdj");
});

app.post("/api/auth/signin", (req: Request, res: Response) => {
  console.log("resasdklfa");
  res.send({ a: "fasdfasdf" });
});
