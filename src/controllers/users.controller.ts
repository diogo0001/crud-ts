import { UserService } from "../services/user.service";
import { User } from "../models/user.interface";
import { UserRepository } from "../repository/user-repository";
import { Request, Response } from "express";

export class UserController {
  public service: UserService;

  constructor() {
    this.service = new UserService(new UserRepository());
    console.log("1", this.service);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    console.log("2", this);
    const users: User[] = await this.service.getAll();
    return res.json(users);
  }

  /*
  usersRouter.get("/users/:uuid", async (req: Request, res: Response) => {
    const uuid: string = req.params.uuid;
  
    try {
      const user: User = await service.get(uuid);
  
      if (user) {
        res.status(200).send(user);
      }
      res.status(404).send("Nao encontrado");
    } catch {
      // res.status(500).send("Erro ao obter usuario");
    }
  });
  
  usersRouter.post("/users/", async (req: Request, res: Response) => {
    try {
      const user: BaseUser = req.body;
      const updatedList = await service.create(user);
      res.status(201).send(updatedList);
    } catch {
      // res.status(500).send("Erro ao inserir usuario");
    }
  });
  
  usersRouter.put("/users/:uuid", async (req: Request, res: Response) => {
    const uuid: string = req.params.uuid;
  
    try {
      const userUpdate: BaseUser = req.body;
  
      const existingUser: BaseUser = await service.get(uuid);
  
      if (existingUser) {
        const updatedItem = await service.update(uuid, userUpdate);
        return res.status(200).send(updatedItem);
      }
  
      const updatedList = await service.create(userUpdate);
  
      res.status(201).json(updatedList);
    } catch {
      // res.status(500).send("Erro ao atualizar usuario");
    }
  });
  
  usersRouter.delete("/users/:uuid", async (req: Request, res: Response) => {
    try {
      const uuid: string = req.params.uuid;
      const updatedList = await service.remove(uuid);
  
      res.status(200).send(updatedList);
    } catch {
      // res.status(500).send("Erro ao deletar usuario");
    }
  });
  */
}
