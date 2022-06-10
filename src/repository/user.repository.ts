import { User } from "../models/user.interface";
import { knexClient } from "../database/knex.config";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(uuid: string): Promise<User | null>;
  create(user: User): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(uuid: string): Promise<User[] | null>;
}

export class UserRepository implements IUserRepository {
  public async findAll(): Promise<User[]> {
    // const query = knexClient.from("users").select<User[]>("*");
    const query = knexClient("users").where("deleted", null);
    return query;
  }

  public async findById(uuid: string): Promise<User | null> {
    const query = knexClient("users").where({ uuid }).first();
    return query;
  }

  public async create(user: User): Promise<User | null> {
    console.log(`Repository create: ${JSON.stringify(user, undefined, 2)}`);

    const insert = knexClient("users")
      .insert(user)
      .then(() => {
        console.log("Created");
      })
      .catch(() => {
        console.log("Error on create");
      });
    return user;
  }

  public async update(user: User): Promise<User | null> {
    console.log(`Repository update: ${JSON.stringify(user, undefined, 2)}`);

    knexClient("users")
      .update(user)
      .where({ uuid: user.uuid })
      .then(() => {
        console.log("Updated");
      })
      .catch(() => {
        console.log("Error on update");
      });

    return user;
  }

  public async delete(uuid: string): Promise<User[] | null> {
    console.log(`Repository delete: ${uuid}`);

    knexClient("users")
      .delete()
      .where({ uuid })
      .then(() => {
        console.log("Deleted");
      })
      .catch(() => {
        console.log("Error on delete");
      });

    return this.findAll();
  }
}
