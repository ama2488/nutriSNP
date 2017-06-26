
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('SNPs').del()
    .then(() =>
      // Inserts seed entries
       knex('SNPs').insert([
        { id: 1, name: 'rs4994', description: 'https://www.snpedia.com/index.php/Rs4994' },
        { id: 2, name: 'rs1042713', description: 'https://www.snpedia.com/index.php/rs1042713' },
        { id: 3, name: 'i6010053', description: 'https://www.snpedia.com/index.php/Rs1799883' },
        { id: 4, name: 'rs1801282', description: 'https://www.snpedia.com/index.php/Rs1801282' },
        { id: 5, name: 'rs1042714', description: 'https://www.snpedia.com/index.php/rs1042714' },
       ]));
};
