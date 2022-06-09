const up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.string("uuid").primary();
    table.string("name", 50).notNullable;
    table.string("lastName", 50).notNullable;
    table.integer("age");
    table.string("email");
    table.string("document");
  });
};

const down = (knex) => {
  return knex.schema.dropTable("users");
};

module.exports = { up, down };
