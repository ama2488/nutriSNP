const knex = require('../db/knex');

function getUser(userID) {
  return knex('users')
    .where('id', userID)
    .first();
}

function getActivities() {
  return knex('activity_levels');
}

function calcCalories(user) {
  let calories;
  if (user.gender === 2) {
    calories = ((((10 * user.weight) + (6.25 * user.height))
      - (5 * user.age)) + 5) * user.activity_level;
    return Math.round(calories, 2);
  }
  calories = (((10 * user.weight) + (6.25 * user.height))
    - (5 * user.age) - 161) * user.activity_level;
  return Math.round(calories, 2);
}

function getMacros(phenID) {
  return knex('phenotype_ntr')
  .where('id', phenID);
}

function calcMacros(calories, phen) {
  const gramsCarbs = (calories * (phen.carb / 100)) / 4;
  const gramsFat = (calories * (phen.fat / 100)) / 9;
  const gramsProtein = (calories * (phen.protein / 100)) / 4;
  return { carbs: Math.round(gramsCarbs, 2),
    fat: Math.round(gramsFat, 2),
    protein: Math.round(gramsProtein, 2) };
}

function getSNPs(userID) {
  return knex('user_snps')
  .join('snps', 'user_snps.snp_id', 'snps.id')
  .select('*')
  .where('user_snps.user_id', userID);
}

function calcPhenotype(snps) {
  const variants = {};
  snps.forEach((snp) => { variants[snp.snp_id] = snp.variant; });

  if (variants[1] === 'A, A' || variants[1] === 'T, T') {
    if (variants[2] === 'A, A' || variants[2] === 'T, T') {
      if (variants[4] === 'C, C') {
        if (variants[5] === 'C, C') {
          return 3;
        }
        return 2;
      }
      return 2;
    } else if (variants[3] === 'G, G') {
      if (variants[4] === 'C, C') {
        if (variants[5] === 'C, C') {
          return 3;
        }
        return 2;
      }
      return 2;
    }
  } else if (variants[3] === 'G, G') {
    if (variants[4] === 'C, C') {
      if (variants[5] === 'C, C') {
        return 3;
      }
      return 2;
    }
    return 2;
  } else if (variants[4] === 'C, C') {
    return 2;
  } else {
    return 1;
  }
}

function calculateMacros(userID) {
  return this.getSNPs(userID).then((variants) => {
    const phen = this.calcPhenotype(variants);
    this.getUser(userID).then((user) => {
      const calories = this.calcCalories(user);
      this.getMacros(phen).then(phenotype => this.calcMacros(calories, phenotype[0]));
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = {
  calcCalories,
  calcMacros,
  calcPhenotype,
  getSNPs,
  getMacros,
  getUser,
  calculateMacros,
  getActivities,
};
