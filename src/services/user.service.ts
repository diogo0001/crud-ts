import { BaseUser, User } from "../models/user.interface";
import { uuid } from "uuidv4";
import { IUserRepository } from "../repository/user-repository";

export class UserService {
  constructor(private repository: IUserRepository) {}

  public async getAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  public async getById(uuid: string): Promise<User | null> {
    return this.repository.findById(uuid);
  }

  public async create(newUser: BaseUser): Promise<User | null> {
    const id = uuid();
    let user: User = newUser as User;
    user.uuid = id;
    this.repository.create(user);
    return this.repository.findById(id);
  }

  public async update(
    uuid: string,
    userUpdate: BaseUser
  ): Promise<User | null> {
    const user = await this.repository.findById(uuid);

    if (!user) {
      return null;
    }

    const updatedUser: User = { uuid, ...userUpdate };

    return this.repository.update(updatedUser);
  }

  public async remove(uuid: string): Promise<User[] | null> {
    const user = await this.repository.findById(uuid);

    if (!user) {
      return null;
    }

    return this.remove(uuid);
  }
}
