
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() =>
    // Inserts seed entries
     knex('users').insert([
       { first: 'friend',
         last: 'sample',
         email: 'sample@dev.am',
         age: 35,
         height: 68,
         weight: 140,
         gender: 1,
         password: '$2a$12$87AuDrCGiFSWdDyyYicrFuSSbfsY.Ug784GegZzLdaXG.zlOonrku',
         activity_level: 1.2,
         is_dummy: true,
         is_admin: false,
         ttam_profile_id: 'sample',
       },
       { first: 'amanda',
         last: 'allen',
         email: 'amanda@dev.am',
         age: 28,
         height: 64,
         weight: 120,
         gender: 1,
         password: '$2a$12$87AuDrCGiFSWdDyyYicrFuSSbfsY.Ug784GegZzLdaXG.zlOonrku',
         activity_level: 1.2,
         is_dummy: false,
         is_admin: true,
       },
     ]));
};
