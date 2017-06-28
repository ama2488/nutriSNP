process.env.NODE_ENV = 'test';

const knex = require('../db/knex');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');

describe('routes : users', () => {
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

  describe('POST /signup', () => {
    it('should create user account and respond with 200', (done) => {
      chai.request(server)
      .post('/signup')
      .send({
        first: 'Amanda',
        last: 'Allen',
        email: 'amanda@amanda.com',
        password: 'hellothere',
      })
      .end((err, res) => {
        res.redirects.length.should.equal(1);
        res.status.should.equal(200);
        done();
      });
    });
  });

  describe('POST /signup existing email', () => {
    it('should respond with 400', (done) => {
      chai.request(server)
      .post('/signup')
      .send({
        first: 'Amanda',
        last: 'Allen',
        email: 'amanda@dev.am',
        password: 'hellothere',
      })
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(400);
        done();
      });
    });
  });

  describe('POST /signup password fewer than 6 characters', () => {
    it('should respond with 400', (done) => {
      chai.request(server)
      .post('/signup')
      .send({
        first: 'Amanda',
        last: 'Allen',
        email: 'amanda@dev.am',
        password: 'hi',
      })
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(400);
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
