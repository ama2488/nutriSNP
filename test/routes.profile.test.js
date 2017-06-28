process.env.NODE_ENV = 'test';

const knex = require('../db/knex');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');

describe('routes : profile', () => {
  beforeEach((done) => {
    knex.migrate.latest()
      .then(() => {
        knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
      })
      .catch((err) => {
        done(err);
      });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  describe('GET /', () => {
    it('should redirect to profile/id', (done) => {
      chai.request(server)
      .get('/profile/')
      .end((err, res) => {
        res.redirects.length.should.equal(1);
        res.status.should.equal(200);
        done();
      });
    });
  });

  describe('GET /profile/id', () => {
    it('should return 200 status', (done) => {
      chai.request(server)
      .get('/profile/1')
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(200);
        done();
      });
    });
  });
});
