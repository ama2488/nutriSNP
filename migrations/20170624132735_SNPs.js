
exports.up = function (knex, Promise) {
  return knex.schema.createTable('snps', (table) => {
    table.integer('id');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('snps');
};
