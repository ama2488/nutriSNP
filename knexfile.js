require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/nutrisnp_dev',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
