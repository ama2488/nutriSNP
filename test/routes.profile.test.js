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
    done();
  });

  describe('POST /signup', () => {
    it('should create user account and respond with 201', (done) => {
      chai.request(server)
      .post('/signup')
      .send({
        first: 'Amanda',
        last: 'Allen',
        email: 'Amanda@amanda.com',
        password: 'hellothere',
      })
      .end((err, res) => {
        res.redirects.length.should.equal(1);
        res.status.should.equal(200);
        done();
      });
    });
  });

  describe('POST /signin', () => {
    it('should sign user in and respond with 200', (done) => {
      chai.request(server)
      .post('/signin')
      .send({
        email: 'amanda@dev.am',
        password: 'hello',
      })
      .end((err, res) => {
        res.redirects.length.should.equal(1);
        res.status.should.equal(200);
        done();
      });
    });
  });
});

describe('POST /signout', () => {
  it('should sign user out and redirect to index', (done) => {
    chai.request(server)
    .post('/signout')
    .end((err, res) => {
      res.redirects.length.should.equal(1);
      res.status.should.equal(200);
      done();
    });
  });
});
