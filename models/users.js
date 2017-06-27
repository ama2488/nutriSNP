const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 12;

function Users() {
  return knex('users');
}

Users.createUser = (data, callback) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      callback(err);
    }
    bcrypt.hash(data.password, salt, (err, hash) => {
      if (err) {
        callback(err);
      }
      data.password = hash;
      Users().insert(data, '*').then((result) => {
        callback(undefined, result);
      });
    });
  });
};

Users.authenticateUser = (email, password, callback) => {
  Users().where({ email }).first().then((user) => {
    if (!user) {
      return callback('Not a valid user.');
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return callback("Username and password don't match");
      }
      return callback(undefined, user);
    });
  });
};

Users.updateUser = (id, data) => knex('users')
  .where('id', id)
  .update(data);

Users.updateSNPs = data => knex('user_snps').insert(data);

module.exports = Users;
