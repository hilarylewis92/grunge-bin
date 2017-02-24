process.env.NODE_ENV = 'test'

var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var server = require('../server')

chai.use(chaiHttp)

describe('API Routes', function() {
  describe('GET /api/offenders', function() {
    it('should return all offenders', function(done) {
      chai.request(server)
      .get('/api/offenders')
      .end(function(err, res) {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      done()
      })
    })
  })

  describe('POST /api/offenders', function() {
    it('should post an offender', function() {
      chai.request(server)
      .post('/api/offenders')
      .end(function(err, res) {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      })
    })
  })

  describe('POST /api/offenders/:id', function() {
    it('should post an offender', function() {
      chai.request(server)
      .post('/api/offenders/1')
      .end(function(err, res) {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      })
    })
  })
})
