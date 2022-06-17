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

  public async getByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }

  public async create(newUser: BaseUser): Promise<User | null> {
    // fazer as validações do user

    let user: User = newUser as User;
    user.uuid = uuid();
    user.created = new Date();
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
    const updatedUser: User = {
      uuid: uuid,
      ...userUpdate,
      password: user.password,
      token: user.token,
    };

    return this.repository.update(updatedUser);
  }

  public async softRemove(uuid: string): Promise<User | null> {
    const user = await this.repository.findById(uuid);
    if (!user) {
      return null;
    }
    user.deleted = new Date();

    return this.repository.update(user);
  }

  public async hardRemove(uuid: string): Promise<User[] | null> {
    const user = await this.repository.findById(uuid);
    if (!user) {
      return null;
    }

    return this.repository.delete(uuid);
  }
}
