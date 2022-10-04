import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai

describe('/matches', () => {
  describe('/', () => {
    describe('GET', () => {
      it('Should return a matches list with all matches', async () => {
        const result = await chai.request(app).get('/matches');

        expect(result.status).to.be.equal(200);

        expect(result.body).to.be.an('array');

        expect(result.body[0]).to.have.property('id');
        expect(result.body[0]).to.have.property('homeTeam');
        expect(result.body[0]).to.have.property('homeTeamGoals');
        expect(result.body[0]).to.have.property('awayTeam');
        expect(result.body[0]).to.have.property('awayTeamGoals');
        expect(result.body[0]).to.have.property('inProgress');
        expect(result.body[0]).to.have.property('teamHome');
        expect(result.body[0]).to.have.property('teamAway');

      })

      it('Should return a matches list with in progress matches', async () => {
        const result = await chai.request(app).get('/matches?inProgress=true');

        expect(result.status).to.be.equal(200);

        expect(result.body).to.be.an('array');

        expect(result.body[0]).to.have.property('id');
        expect(result.body[0]).to.have.property('homeTeam');
        expect(result.body[0]).to.have.property('homeTeamGoals');
        expect(result.body[0]).to.have.property('awayTeam');
        expect(result.body[0]).to.have.property('awayTeamGoals');
        expect(result.body[0]).to.have.property('inProgress');
        expect(result.body[0]).to.have.property('teamHome');
        expect(result.body[0]).to.have.property('teamAway');

        expect(result.body[0].inProgress).to.be.true;
      })

      it('Should return a matches list with not in progress matches', async () => {
        const result = await chai.request(app).get('/matches?inProgress=false');

        expect(result.status).to.be.equal(200);

        expect(result.body).to.be.an('array');

        expect(result.body[0]).to.have.property('id');
        expect(result.body[0]).to.have.property('homeTeam');
        expect(result.body[0]).to.have.property('homeTeamGoals');
        expect(result.body[0]).to.have.property('awayTeam');
        expect(result.body[0]).to.have.property('awayTeamGoals');
        expect(result.body[0]).to.have.property('inProgress');
        expect(result.body[0]).to.have.property('teamHome');
        expect(result.body[0]).to.have.property('teamAway');

        expect(result.body[0].inProgress).to.be.false;
      })
    })
    describe('POST', () => {
      const postData = {
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: true,
      }

      const equalsteamsPostData = {
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 16,
        awayTeamGoals: 2,
        inProgress: true,
      }

      const invalidTeamPostData = {
        homeTeam: 1600,
        homeTeamGoals: 2,
        awayTeam: 16,
        awayTeamGoals: 2,
        inProgress: true,
      }

      const authorization = 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0'

      it('Should return inserted match', async () => {
        const result = await chai.request(app).post('/matches').send(postData).set(
          'authorization', authorization
        );

        expect(result.status).to.be.equal(201);

        expect(result.body).to.be.an('object');

        expect(result.body).to.have.property('id');
        expect(result.body).to.have.property('homeTeam');
        expect(result.body).to.have.property('homeTeamGoals');
        expect(result.body).to.have.property('awayTeam');
        expect(result.body).to.have.property('awayTeamGoals');
        expect(result.body).to.have.property('inProgress');
      })

      it('Should not allow insert two equals teams in a match', async () => {
        const result = await chai.request(app).post('/matches').send(equalsteamsPostData).set(
          'authorization', authorization
        );

        expect(result.status).to.be.equal(401);

        expect(result.body).to.be.an('object');

        expect(result.body).to.have.property('message')
        expect(result.body.message).to.be.equal('It is not possible to create a match with two equal teams')
      })

      it('Should not allow insert an inexistent team', async () => {
        const result = await chai.request(app).post('/matches').send(invalidTeamPostData).set(
          'authorization', authorization
        );

        expect(result.status).to.be.equal(404);

        expect(result.body).to.be.an('object');

        expect(result.body).to.have.property('message')
        expect(result.body.message).to.be.equal('There is no team with such id!')
      })

      it('Should not allow insert a match without a token', async () => {
        const result = await chai.request(app).post('/matches').send(postData);

        expect(result.status).to.be.equal(401);

        expect(result.body).to.be.an('object');

        expect(result.body).to.have.property('message')
        expect(result.body.message).to.be.equal('Token must be a valid token')
      })
    })
  })
  describe('/:id/finish', () => {
    describe('PATCH', () => {
      it('Should change an in progress match to finished', async () => {
        const result = await chai.request(app).patch('/matches/1/finish');

        expect(result.status).to.be.equal(200);

        expect(result.body).to.be.an('object');

        expect(result.body).to.have.property('message')
        expect(result.body.message).to.be.equal('Finished')
      })
    })
  })
  describe('/:id', () => {
    describe('PATCH', () => {
      const patchMatch = {
        homeTeamGoals: 3,
        awayTeamGoals: 1
      }
      it('Should update result of in progress match', async () => {
        const result = await chai.request(app).patch('/matches/1').send(patchMatch);

        expect(result.status).to.be.equal(200);

        expect(result.body).to.be.an('object');

        expect(result.body).to.have.property('homeTeamGoals')
        expect(result.body).to.have.property('awayTeamGoals')
      })
    })
  })
})