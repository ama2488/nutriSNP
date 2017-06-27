
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_snps').del()
    .then(() =>
      // Inserts seed entries
       knex('user_snps').insert([
        { user_id: 1, snp_id: 1, variant: 'A, G' },
        { user_id: 1, snp_id: 2, variant: 'A, G' },
        { user_id: 1, snp_id: 3, variant: 'C, C' },
        { user_id: 1, snp_id: 4, variant: 'C, C' },
        { user_id: 1, snp_id: 5, variant: 'C, G' },
       ]));
};
