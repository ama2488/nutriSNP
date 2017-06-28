const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 12;

function Users() {
  return knex('users');
}

Users.createUser = (data, callback) => {
  if (data.password.length < 6) {
    return callback('Password must be at least 6 characters.');
  }
  Users().where('email', data.email).first().then((account) => {
    if (account) {
      return callback('An account with this email already exists.');
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (e, salt) => {
      if (e) {
        callback(e);
      }
      bcrypt.hash(data.password, salt, (error, hash) => {
        if (error) {
          callback(error);
        }
        data.password = hash;
        Users().insert(data, '*').then((result) => {
          callback(undefined, result);
        })
          .catch((err) => {
            console.log(err);
            callback(err);
          });
      });
    });
  });
};

Users.createFbUser = (data, callback) => {
  Users().insert(data, '*').then((result) => {
    callback(undefined, result);
  })
  .catch((err) => {
    callback(err);
  });
};

Users.authenticateUser = (email, password, callback) => {
  Users().where({ email }).first().then((user) => {
    if (!user) {
      return callback('Not a valid user.');
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return callback('Username and password don\'t match');
      }
      return callback(undefined, user);
    });
  });
};

Users.updateUser = (id, data) => knex('users')
.where('id', id)
.update(data);

Users.updateSNPs = data => knex('user_snps').insert(data);

Users.updateLinks = (id, data) => knex('snps')
.where('id', id)
.update(data);


module.exports = Users;
