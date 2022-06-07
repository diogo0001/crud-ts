import { BaseEntity } from "../models/base-entity.interface";
import { BaseUser, User } from "../models/user.interface";
import { Users } from "../models/users.interface";
import { uuid } from "uuidv4";

export class UserService {
  private users: Users = {
    "22fe96b4-443d-4f92-adea-49f645703a24": {
      uuid: uuid(),
      name: "Tony",
      lastName: "Stark",
    },
    "31a7e2f5-e271-41c1-9eb0-c1ca4a3d1c13": {
      uuid: uuid(),
      name: "Harry",
      lastName: "Potter",
    },
    "fef049d2-d365-4b84-bbbb-a607e5e51590": {
      uuid: uuid(),
      name: "Marty",
      lastName: "Macfly",
      email: "back@future.doc",
    },
  };

  public async getAll(): Promise<User[]> {
    return Object.values(this.users);
  }

  public async get(id: string): Promise<User> {
    return this.users[id];
  }

  public async create(newUser: BaseUser): Promise<User> {
    const id = uuid();
    this.users[id] = newUser as User;
    this.users[id].uuid = id;

    return this.users[id];
  }

  public async update(
    uuid: string,
    userUpdate: BaseUser
  ): Promise<User | null> {
    const user = await this.get(uuid);

    if (!user) {
      return null;
    }

    this.users[uuid] = { uuid, ...userUpdate };

    return this.users[uuid];
  }

  public async remove(uuid: string): Promise<null | void> {
    const user = await this.get(uuid);

    if (!user) {
      return null;
    }

    delete this.users[uuid];
  }
}
