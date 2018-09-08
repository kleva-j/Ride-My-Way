import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const ridesRoute = '/api/v1/rides';

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
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error.start)
            .to.include('A Location is required');
            done();
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
          expect(res.body.error.date)
            .to.include('A Date is required');
            done();
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
          expect(res.body.error.stop)
            .to.include('A Destination is required');
            done();
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
          expect(res.body.error.driver)
            .to.include(`Driver's details are required`);
            done();
        });
    });
    it('should not create ride with less than 3 characters of the location', (done) => {
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
          expect(res.body.start)
            .to.include({length: 'Please enter a valid length of Destination'});
            done();
        });
    });
    // it('should not create ride with less than 3 characters of the destination', (done) => {
    //   chai.request(app)
    //     .post(`${ridesRoute}`)
    //     .send({
    //       start: 'Yaba',
    //       date: '2018 - 07 - 22',
    //       stop: 'ju',
    //       driver: {
    //         name: 'Ayo bami',
    //         gender: 'male',
    //         id: 101
    //       }
    //     })
    //     .end((err, res) => {
    //       expect(res.status).to.equal(400);
    //       expect(res.body).to.be.an('object');
    //       expect(res.body.message)
    //         .to.include('The Destination should be between 3 to 20 characters');
    //     });
    //     done();
    // });

    // // Create Ride
    // it('should create a ride offer', (done) => {
    //   chai.request(app)
    //     .post(`${ridesRoute}`)
    //     .send({
    //       start: 'Yaba',
    //       date: '2018 - 07 - 22',
    //       stop: 'Jungle',
    //       driver: {
    //         name: 'Ayo bami',
    //         gender: 'male',
    //         id: 101
    //       }
    //     })
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200);
    //       expect(res.body).to.be.an('object');
    //       expect(res.body.message)
    //         .to.include('Ride offer added successfully!');
    //         done();
    //     });
    // });
  });
});
