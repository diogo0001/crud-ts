import express from "express";
import { authRouter } from "./auth.router";
import { usersRouter } from "./users.router";

export const router = express.Router();

router.use("/auth/", authRouter).use("/users/", usersRouter);
