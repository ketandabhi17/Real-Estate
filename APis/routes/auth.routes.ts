import express from "express";
import { SignIn, SignUp } from "../controllers/auth.controller";

const router = express.Router();

router.post("/sign-in", SignIn);

router.post("/sign-up", SignUp);

export default router;
