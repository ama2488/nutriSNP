
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() =>
    // Inserts seed entries
     knex('users').insert([
       { first: 'amanda',
         last: 'allen',
         email: 'amanda@dev.am',
         age: 27,
         height: 163,
         weight: 122,
         gender: 1,
         password: '$2a$12$87AuDrCGiFSWdDyyYicrFuSSbfsY.Ug784GegZzLdaXG.zlOonrku',
         activity_level: 1.2,
         is_admin: true,
       },
     ]));
};
