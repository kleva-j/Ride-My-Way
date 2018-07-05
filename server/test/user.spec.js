import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const userRoute = '/api/v1/auth/user';

describe('USER CONTROLLER', () => {

})