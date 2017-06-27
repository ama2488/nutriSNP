// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/nutrisnp_dev',
  },

  production: {
    client: 'pg',
    connection: DATABASE_URL,
  },
};
