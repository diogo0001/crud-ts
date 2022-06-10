import { User } from "../models/user.interface";
import { knexClient } from "../database/knex-config";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(uuid: string): Promise<User | null>;
  create(user: User): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(uuid: string): Promise<User[] | null>;
}

export class UserRepository implements IUserRepository {
  public async findAll(): Promise<User[]> {
    const query = knexClient.from("users").select<User[]>("*");
    return query;
  }

  public async findById(uuid: string): Promise<User | null> {
    const query = knexClient.from("users").where("uuid", uuid).first();
    return query;
  }

  public async create(user: User): Promise<User | null> {
    console.log("create");
    return user;
  }

  public async update(user: User): Promise<User | null> {
    console.log("Update");
    return user;
  }

  public async delete(uuid: string): Promise<User[] | null> {
    console.log("Delete");
    return this.findAll();
  }
}
