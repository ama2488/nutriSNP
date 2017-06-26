
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first').notNullable();
    table.string('last').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('age');
    table.float('height');
    table.float('weight');
    table.integer('gender');
    table.float('activity_level');
    table.string('TTAM_profile_id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
