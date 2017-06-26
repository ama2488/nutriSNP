
exports.up = function (knex, Promise) {
  return knex.schema.createTable('phenotype_ntr', (table) => {
    table.integer('id');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('carb').notNullable();
    table.string('fat').notNullable();
    table.string('protein').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('phenotype_ntr');
};
