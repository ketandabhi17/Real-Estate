import express from "express";
import { SignIn, SignUp, googleAuth } from "../controllers/auth.controller";

const router = express.Router();

router.post("/sign-in", SignIn);

router.post("/sign-up", SignUp);

router.post('/google',googleAuth)

export default router;
