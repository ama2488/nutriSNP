
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('activity_levels').del()
    .then(() =>
      // Inserts seed entries
       knex('activity_levels').insert([
        { id: 1, title: 'Sedentary', description: 'Little to no exercise', factor: 1.2 },
        { id: 2, title: 'Lightly Active', description: 'Light exercise (1–3 days per week)', factor: 1.375 },
        { id: 3, title: 'Moderately Active', description: 'Moderate exercise (3–5 days per week)', factor: 1.55 },
        { id: 4, title: 'Active', description: 'Heavy exercise (6–7 days per week)', factor: 1.725 },
        { id: 5, title: 'Very Active', description: 'Very heavy exercise (twice per day, high intensity workouts)', factor: 1.9 },
       ]));
};
