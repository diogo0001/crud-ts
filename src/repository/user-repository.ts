import { User, mockUsers } from "../models/user.interface";
import { knexClient } from "../database/knex-config";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(uuid: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  public async findAll(): Promise<User[]> {
    const query = knexClient.from("users").select<User[]>("*");
    return query;
  }

  public async findById(uuid: string): Promise<User | null> {
    return null;
  }
}
