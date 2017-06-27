require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/nutrisnp_dev',
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/reads_test',
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}?ssl=true`,
  },
};
