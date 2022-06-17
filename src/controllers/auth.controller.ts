import { User } from "../models/user.interface";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

const service = new UserService(new UserRepository());

export class AuthenticationController {
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, lastName, email, hash } = req.body;

      if (!(email && hash && name && lastName)) {
        return res.status(400).send("All input is required");
      }

      const oldUser = await service.getByEmail(email);

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      const bcrypt = require("bcrypt");
      const encryptedPassword = await bcrypt.hash(hash, 10);

      const user = await service.create({
        name: name,
        lastName: lastName,
        email: email.toLowerCase(),
        hash: encryptedPassword,
      } as User);

      console.log(user);

      if (!user) {
        return res.status(500).send("Internal server error");
      }

      const token = jwt.sign(
        { uuid: user?.uuid, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, hash } = req.body;

      if (!(email && hash)) {
        return res.status(400).send("All input is required");
      }

      const user = await service.getByEmail(email);
      const bcrypt = require("bcrypt");

      if (user && (await bcrypt.compare(hash, user.hash))) {
        const token = jwt.sign(
          { uuid: user.uuid, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        user.token = token;
        return res.status(200).json(user);
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }
}
