import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai

describe('/LOGIN', () => {
  describe('/', () => {
    it('Should be login successfully', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('token');
    });

    it('Should return bad request status when email not passed', async () => {
      const result = await chai.request(app).post('/login').send({
        password: 'secret_admin'
      });

      expect(result.status).to.be.equal(400);
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('All fields must be filled');
    })

    it('Should return bad request status when password not passed', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com'
      });

      expect(result.status).to.be.equal(400);
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('All fields must be filled');
    })

    it('Should not allow login with invalid email', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'teste@teste.com',
        password: 'my_secret'
      });

      expect(result.status).to.be.equal(401);
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Incorrect email or password');
    })

    it('Should not allow login with invalid password', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'teste'
      });

      expect(result.status).to.be.equal(401);
      expect(result.body).to.have.property('message');
      expect(result.body.message).to.be.equal('Incorrect email or password');
    })
  });
  describe('/validate', () => {
    it('Should return a role when token passed in authorization header', async () => {
      const result = await chai.request(app).get('/login/validate').set(
        'authorization', 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0'
      )

      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('role');
      expect(result.body.role).to.be.equal('admin');
    });
  });
});
