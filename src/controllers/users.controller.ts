import { UserService } from "../services/user.service";
import { User, BaseUser } from "../models/user.interface";
import { UserRepository } from "../repository/user.repository";
import { Request, Response } from "express";

const service = new UserService(new UserRepository());

export class UserController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users: BaseUser[] = await service.getAll();
      return res.json(users);
    } catch {
      return res.status(500).send("Erro ao obter usuarios");
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const uuid: string = req.params.uuid;
      const user: User | null = await service.getById(uuid);
      return res.json(user);
    } catch {
      return res.status(500).send("Erro ao obter usuario");
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const updatedUser = await service.create(req.body as BaseUser);
      return res.status(201).json(updatedUser);
    } catch {
      return res.status(500).send("Erro ao criar usuario");
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedUser = await service.update(
        req.params.uuid as string,
        req.body as BaseUser
      );

      return res.status(201).json(updatedUser);
    } catch {
      return res.status(500).send("Erro ao atualizar usuario");
    }
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    try {
      const deletedUser = await service.softRemove(req.params.uuid as string);
      return res.status(200).json(deletedUser);
    } catch {
      return res.status(500).send("Erro ao deletar usuario");
    }
  }
}
