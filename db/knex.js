const environment = process.env.DATABASE_URL || 'development';
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
