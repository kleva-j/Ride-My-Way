import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const ridesRoute = '/api/v1/rides';


describe('RIDE CONTROLLER', () => {
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

  //POST REQUESTS

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


});

describe('RIDE CONTROLLER', () => {

  describe('Create Ride', () => {
    it('should not create ride with an empty location field', (done) => {
      chai.request(app)
        .post(`${ridesRoute}`)
        .send({
          start: '',
          date: '2018 - 10 - 02',
          stop: 'Ilupeju',
          driver: {
            name: 'Ayo bami',
            gender: 'male',
            id: 101
          }
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error.start)
            .to.include('A Location is required');
        });
    });
    it('should not create ride with an empty date field', (done) => {
      chai.request(app)
        .post(`${ridesRoute}`)
        .send({
          start: 'Yaba',
          date: '',
          stop: 'Ilupeju',
          driver: {
            name: 'Ayo bami',
            gender: 'male',
            id: 101
          }
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error.start)
            .to.include('A Date is required');
        });
    });
    it('should not create ride with an empty destination field', (done) => {
      chai.request(app)
        .post(`${ridesRoute}`)
        .send({
          start: 'Yaba',
          date: '2018 - 05 - 02',
          stop: '',
          driver: {
            name: 'Ayo bami',
            gender: 'male',
            id: 101
          }
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error.start)
            .to.include('A Destination is required');
        });
    });
    it('should not create ride with an empty driver details', (done) => {
      chai.request(app)
        .post(`${ridesRoute}`)
        .send({
          start: 'Yaba',
          date: '2018 - 05 - 03',
          stop: 'Ilupeju',
          driver: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error.start)
            .to.include(`Driver's details are required`);
        });
    });
    it('should not create ride with less than 3 characters of the location', () => {
      chai.request(app)
        .post(`${ridesRoute}`)
        .send({
          start: 'Ya',
          date: '2018 - 07 - 22',
          stop: 'Ilupeju',
          driver: {
            name: 'Ayo bami',
            gender: 'male',
            id: 101
          }
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message)
            .to.include('The Location should be between 3 to 20 characters');
        });
    });
    it('should not create ride with less than 3 characters of the destination', () => {
      chai.request(app)
        .post(`${ridesRoute}`)
        .send({
          start: 'Yaba',
          date: '2018 - 07 - 22',
          stop: 'ju',
          driver: {
            name: 'Ayo bami',
            gender: 'male',
            id: 101
          }
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message)
            .to.include('The Destination should be between 3 to 20 characters');
        });
    });

    // Create Ride
    it('should create a ride offer', () => {
      chai.request(app)
        .post(`${ridesRoute}`)
        .send({
          start: 'Yaba',
          date: '2018 - 07 - 22',
          stop: 'Jungle',
          driver: {
            name: 'Ayo bami',
            gender: 'male',
            id: 101
          }
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message)
            .to.include('Ride offer added successfully!');
        });
    });


      // Make a ride request
  it('should return a new ride offer', () =>
  chai.request(app)
    .post(`${ridesRoute}/:rideId/requests`)
    .then((res) => {
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
    }));
  });
});