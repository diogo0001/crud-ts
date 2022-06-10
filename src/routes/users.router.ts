import express, { Request, Response } from "express";
import { UserController } from "../controllers/users.controller";

export const usersRouter = express.Router();

const userController = new UserController();

usersRouter
  .get("/users/", userController.getAll)
  .get("/users/:uuid", userController.getById)
  .post("/users/", userController.create)
  .put("/users/:uuid", userController.update)
  .delete("/users/:uuid", userController.remove);
