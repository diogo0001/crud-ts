import { BaseUser, User } from "../models/user.interface";
import { uuid } from "uuidv4";
import { IUserRepository } from "../repository/user.repository";

export class UserService {
  constructor(private repository: IUserRepository) {}

  public async getAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  public async getById(uuid: string): Promise<User | null> {
    return this.repository.findById(uuid);
  }

  public async create(newUser: BaseUser): Promise<User | null> {
    // fazer as validações do user

    let user: User = newUser as User;
    user.uuid = uuid();
    user.created = new Date();

    // console.log(`Service create: ${JSON.stringify(user, undefined, 2)}`);

    this.repository.create(user);
    return user;
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

  public async removeSoft(uuid: string): Promise<User | null> {
    const user = await this.repository.findById(uuid);
    if (!user) {
      return null;
    }
    user.deleted = new Date();

    return this.repository.update(user);
  }

  public async removeHard(uuid: string): Promise<User[] | null> {
    const user = await this.repository.findById(uuid);
    if (!user) {
      return null;
    }

    return this.repository.delete(uuid);
  }
}
