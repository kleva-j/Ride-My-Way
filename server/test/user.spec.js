import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const userRoute = '/api/v1/auth';

describe('USER AUTHENTICATION', () => {

  describe('SIGNIN AUTH', () => {

    it('should not log a user in without an email address', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        email: '',
        password: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.start)
          .to.include('Email is required');
          done();
      });
    });

    it('should not log a user in without a password', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        email: 'kasmickleva@gmail.com',
        password: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.start)
          .to.include('Password is required');
          done();
      });
    });
  })

  describe('SIGNUP AUTH', () => {

    //firstname
    it('should not sign up a user without firstname', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: '',
        lastname: 'Obasi',
        username: 'kasmickleva',
        email: 'kasmickleva@gmail.com',
        password: 'andela2018',
        confirmPassword: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.firstname)
          .to.include('A Firstname is required');
          done();
      });
    });

    //lastname
    it('should not sign up a user without a lastname', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: '',
        username: 'kasmickleva',
        email: 'kasmickleva@gmail.com',
        password: 'andela2018',
        confirmPassword: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.lastname)
          .to.include('A Lastname is required');
          done();
      });
    });

    //username
    it('should not sign up a user without a username', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: '',
        email: 'kasmickleva@gmail.com',
        password: 'andela2018',
        confirmPassword: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.username)
          .to.include('A Username is required');
          done();
      });
    });

    //email
    it('should not sign up a user without an email address', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: 'kasmickleva',
        email: '',
        password: 'andela2018',
        confirmPassword: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.email)
          .to.include('An Email Address is required');
          done();
      });
    });

    //password
    it('should not sign up a user without a password', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: 'kasmickleva',
        email: 'kasmickleva@gmail.com',
        password: '',
        confirmPassword: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.password)
          .to.include('A Password is required');
          done();
      });
    });

    //confirmPassword
    it('should not sign up a user without a confirmed password', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: 'kasmickleva',
        email: 'kasmickleva@gmail.com',
        password: 'andela2018',
        confirmPassword: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.password)
          .to.include('Please comfirm your password');
        done();
      });
    });

  });

  describe('AUTH INPUT LENGTH', () => {

    //Alphanumeric username
    it('should not sign up a user without a valid Alphanumeric username', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: '@s$0)',
        email: 'kasmickleva@gmail.com',
        password: 'andela2018',
        confirmPassword: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body).to.be.an('object');
        expect(res.body.message)
          .to.include('Only alphabets and numbers are allowed.');
        done();
      });
    });

    //length of username
    it('should not sign up a user without a username length range of 4 to 15', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: 'kasmickleva',
        email: 'kasmickleva@gmail.com',
        password: 'andela2018',
        confirmPassword: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body).to.be.an('object');
        expect(res.body.message)
          .to.include('Username can only be from 4 to 15 characters');
        done();
      });
    });

    //length of password
    it('should not sign up a user without a password length range of 6 to 12', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: 'kasmickleva',
        email: 'kasmickleva@gmail.com',
        password: 'andel',
        confirmPassword: 'andel'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message)
          .to.include('Password can only be from 6 to 12 characters');
        done();
      });
    });

  })

  describe('', () => {

    before('sign in a user', () => {
      chai.request(app)
      .post(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: 'kasmickleva',
        email: 'kasmickleva@gmail.com',
        password: 'andela2018',
        confirmPassword: 'andela2018'
      })
    })

    it('should not sign up a user if email already exist in database', (done) => {
      chai.request(app)
      .get(`${userRoute}`)
      .send({
        firstname: 'Michael',
        lastname: 'Obasi',
        username: 'kasmickleva',
        email: 'kasmickleva@gmail.com',
        password: 'andela2018',
        confirmPassword: 'andela2018'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error.firstname)
          .to.include(`User already exist with the email address of ${email}`);
          done();
      });
    });

  })
})