import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai

describe('/TEAMS', () => {
  describe('/', () => {
    it('Should return an array of teams', async () => {
      const result = await chai.request(app).get('/teams');

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.an('array');
      expect(result.body[0]).to.have.property('id');
      expect(result.body[0]).to.have.property('teamName');
      expect(result.body[0].id).to.be.equal(1);
      expect(result.body[0].teamName).to.be.equal('Avaí/Kindermann');
    });
  });
  describe('/:ID', () => {
    it('Should return a team', async () => {
      const result = await chai.request(app).get('/teams/1');

      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.property('id');
      expect(result.body).to.have.property('teamName');
      expect(result.body.id).to.be.equal(1);
      expect(result.body.teamName).to.be.equal('Avaí/Kindermann');
    });
    it('Should return an empty object when id does not exist', async () => {
      const result = await chai.request(app).get('/teams/1000');

      expect(result.status).to.be.equal(200);
      expect(result.body).not.to.have.property('id');
      expect(result.body).not.to.have.property('teamName');
      expect(result.body).to.be.empty;
    });
  });
});
