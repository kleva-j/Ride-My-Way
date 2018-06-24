import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const ridesRoute = '/api/v1/rides';
// const userRoute = 'api/v1/users';

describe('API endpoint /rides', () => {
  // GET - list all rides
  it('should return all rides', () =>
    chai.request(app)
      .get(`${ridesRoute}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
      }));

  // GET - Invalid path
  it('should return Not found', () =>
    chai.request(app)
      .get('/INVALID PATH')
      .then((res) => {
        expect(res).to.have.status(404);
      }));

  // GET - get specific ride
  it('should return', () =>
    chai.request(app)
      .get(`${ridesRoute}/:rideID`)
      .then((res) => {
        expect(res).to.have.status(200);
      }));

  // POST - Invalid path
  it('should return Not found', () =>
    chai.request(app)
      .post('/INVALID PATH')
      .then((res) => {
        expect(res).to.have.status(404);
      }));

  // POST - create ride
  it('should return a new ride offer', () =>
    chai.request(app)
      .post((`${ridesRoute}`))
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
      }));

  // Make a ride offer
  it('should return a new ride offer', () =>
    chai.request(app)
      .post(`${ridesRoute}/:rideId/requests`)
      .then((res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
      }));
});

