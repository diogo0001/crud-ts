import express from "express";
import { AuthenticationController } from "../controllers/auth.controller";

const authController = new AuthenticationController();

export const authRouter = express.Router();

authRouter
  .post("/register/", authController.register)
  .post("/login/", authController.login);
