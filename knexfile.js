// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/nutrisnp_dev',
  },

  testing: {
    client: 'pg',
    connection: 'postgres://localhost/nutrisnp_test',
  },
};
