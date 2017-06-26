
exports.up = function (knex, Promise) {
  return knex.schema.createTable('activity_levels', (table) => {
    table.integer('id');
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.float('factor').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('activity_levels');
};
