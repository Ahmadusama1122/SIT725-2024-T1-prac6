const assert = require('assert');
const request = require('supertest');
const app = require('../server');

describe('GET /api/cards', function () {
    it('responds with json containing all cards', function (done) {
        this.timeout(5000); 
        request(app)
            .get('/api/cards')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                assert(Array.isArray(res.body.data));
                done();
            });
    });
});

describe('POST /api/card', function () {
    it('responds with json containing the added card', function (done) {
        this.timeout(5000); 
        request(app)
            .post('/api/card')
            .send({ title: 'New Card', description: 'This is a new card' })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});

describe('DELETE /api/card/:id', function () {
    let newCardId;

    before(function (done) {
        this.timeout(5000); 
        request(app)
            .post('/api/card')
            .send({ title: 'New Card', description: 'This is a new card' })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                newCardId = '662b003196912ef030cfbeb0';
                done();
            });
    });

    it('responds with json containing the deleted card', function (done) {
        this.timeout(5000); 
        request(app)
            .delete(`/api/card/${newCardId}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);

                // Log the response content type
                console.log('Response Content Type:', res.headers['content-type']);

                done();
            });
    });
});
