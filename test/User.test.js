const chai = require('chai');

const expect = chai.expect;
const url = `http://localhost:3000/`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Check for a particular user info', (done) => {
        request.post('user')
            .send({
                query: `query {
                    one_user(id: "1") {
                        id
                        name
                        email
                        total_amount
                    }
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // res will contain array with one user
                expect(res.body.data.one_user).to.have.property('id').eq('1')
                expect(res.body.data.one_user).to.have.property('name')
                expect(res.body.data.one_user).to.have.property('email')
                expect(res.body.data.one_user).to.have.property('total_amount')
                done();
            })
    })

    it('Check for all user info', (done) => {
        request.post('user')
            .send({
                query: `query {
                    all_user {
                        id
                        name
                        email
                        total_amount
                    }
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // res will contain array with one user
                expect(res.body.data.all_user).to.be.an('array')
                expect(res.body.data.all_user[0]).to.have.property('id')
                expect(res.body.data.all_user[0]).to.have.property('name')
                expect(res.body.data.all_user[0]).to.have.property('email')
                expect(res.body.data.all_user[0]).to.have.property('total_amount')
                done();
            })
    })

    it('Check for Registration of a user', (done) => {
        request.post('user')
            .send({
                query: `mutation {
                    register_user (name: "test", email: "test@tester.com", password: "1234") {
                        id
                        name
                        email
                        total_amount
                    }
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // res will contain array with one user
                expect(res.body.data.register_user).to.have.property('id')
                expect(res.body.data.register_user).to.have.property('name')
                expect(res.body.data.register_user).to.have.property('email')
                expect(res.body.data.register_user).to.have.property('total_amount').eq(0)
                done();
            })
    })

    it('Check for deposit amount (with decimal) of a user', (done) => {
        request.post('user')
            .send({
                query: `mutation {
                    deposit_amount (id: "1", amount: 10.2) {
                        id
                        name
                        email
                        total_amount
                    }
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // res will contain array with one user
                expect(res.body.data.deposit_amount).to.have.property('id')
                expect(res.body.data.deposit_amount).to.have.property('name')
                expect(res.body.data.deposit_amount).to.have.property('email')
                expect(res.body.data.deposit_amount).to.have.property('total_amount')
                done();
            })
    })

    it('Check for withdrawal amount (with decimal) of a user', (done) => {
        request.post('user')
            .send({
                query: `mutation {
                    withdrawal_amount (id: "1", amount: 10.2) {
                        id
                        name
                        email
                        total_amount
                    }
                }`
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // res will contain array with one user
                expect(res.body.data.withdrawal_amount).to.have.property('id')
                expect(res.body.data.withdrawal_amount).to.have.property('name')
                expect(res.body.data.withdrawal_amount).to.have.property('email')
                expect(res.body.data.withdrawal_amount).to.have.property('total_amount')
                done();
            })
    })

    it('Check for withdrawal amount not less then zero', (done) => {
        request.post('user')
            .send({
                query: `mutation {
                    withdrawal_amount (id: "1", amount: 10.2) {
                        id
                        name
                        email
                        total_amount
                    }
                }`
            })
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                // res will contain array with one user
                expect(res.body.data).to.be.a('null')
                expect(res.body.errors[0]).to.have.property('message').eq('Failed to withdrawal amount')
                expect(res.body.errors[0]).to.have.property('status').eq(417)
                done();
            })
    })
})