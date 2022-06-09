import knex, { Knex } from "knex";
import { resolve } from "path";

export const knexClient = knex({
  client: "sqlite3",
  connection: {
    filename: resolve(__dirname, "dev.sqlite3"),
  },
  useNullAsDefault: true,
});
