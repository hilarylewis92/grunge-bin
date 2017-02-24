const express = require('express')
const chai = require('chai')
const should = chai.should()
const expect = chai.expect()
const chaiHttp = require('chai-http')
const server = require('../server')
const jsdom = require('mocha-jsdom')

chai.use(chaiHttp)

describe('Unit test', function() {
  jsdom()

  it('should display a title', (done) => {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      res.text.should.include('Grunge Bin')
      done()
    })
  })

  it('should display a list', (done) => {
    chai.request(server)
    .get('/api/offenders')
    .end(function(err, res) {
      res.text.should.include('offenders')
      res.text.should.include('id')
      res.text.should.include('offender')
      done()
    })
  })
})
