import express from "express";
import { UserController } from "../controllers/users.controller";
import { verifyToken } from "../middleware/auth.token";

export const usersRouter = express.Router();

const userController = new UserController();

usersRouter
  .get("/", userController.getAll)
  .get("/:uuid", verifyToken, userController.getById)
  .post("/", verifyToken, userController.create)
  .put("/:uuid", verifyToken, userController.update)
  .delete("/:uuid", verifyToken, userController.remove);
