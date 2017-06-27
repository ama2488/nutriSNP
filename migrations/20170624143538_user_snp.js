
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_snps', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('snp_id').notNullable();
    table.string('variant').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user_snps');
};
