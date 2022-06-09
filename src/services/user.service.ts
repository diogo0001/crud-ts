import { BaseEntity } from "../models/base-entity.interface";
import { BaseUser, User, mockUsers } from "../models/user.interface";
import { uuid } from "uuidv4";
import { IUserRepository } from "../repository/user-repository";

export class UserService {
  constructor(private repository: IUserRepository) {}

  // public users = mockUsers;

  // public getIndex(uuid: string): number {
  //   return this.users.findIndex((u) => u.uuid === uuid);
  // }

  public async getAll(): Promise<User[]> {
    return this.repository.findAll();
  }
  /*
  public async get(uuid: string): Promise<User> {
    return this.users[this.getIndex(uuid)];
  }

  public async create(newUser: BaseUser): Promise<User[]> {
    const id = uuid();
    let user: User = newUser as User;
    user.uuid = id;
    this.users.push(user);

    return this.users;
  }

  public async update(
    uuid: string,
    userUpdate: BaseUser
  ): Promise<User[] | null> {
    const user = await this.get(uuid);

    if (!user) {
      return null;
    }

    const index = this.getIndex(uuid);
    this.users[index] = { uuid, ...userUpdate };

    return this.users;
  }

  public async remove(uuid: string): Promise<User[] | null> {
    const user = await this.get(uuid);

    if (!user) {
      return null;
    }

    this.users.splice(this.getIndex(uuid), 1);
    return this.users;
  }

*/
}
