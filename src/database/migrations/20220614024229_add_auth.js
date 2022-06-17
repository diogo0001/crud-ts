const up = (knex) => {
  return knex.schema.table("users", (table) => {
    table.string("hash").notNullable;
    table.string("token");
  });
};

const down = (knex) => {
  return knex.schema.dropTable("users");
};

module.exports = { up, down };
