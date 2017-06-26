
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('phenotype_ntr').del()
    .then(() =>
      // Inserts seed entries
       knex('phenotype_ntr').insert([
        { id: 1, name: 'low carb', description: 'For weight loss, those with your genetic makeup lose 2.5 times as much weight on a low carbohydrate diet.', carb: 30, fat: 35, protein: 35 },
        { id: 2, name: 'low fat', description: 'For weight loss, those with your genetic makeup lose 2.5 times as much weight on a low fat diet.', carb: 60, fat: 20, protein: 25 },
        { id: 3, name: 'varied', description: 'Those with your genetic makeup show the same outcomes when following either a low carb or low fat diet.', carb: 50, fat: 30, protein: 20 },
       ]));
};
