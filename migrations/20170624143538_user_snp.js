
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_SNPs', (table) => {
    table.increments();
    table.string('user_id').notNullable();
    table.string('snp_id').notNullable();
    table.string('variant').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user_SNPs');
};
