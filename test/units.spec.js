// const express = require('express')
// const chai = require('chai')
// const should = chai.should()
// const expect = chai.expect()
// const chaiHttp = require('chai-http')
// const server = require('../server')
// const jsdom = require('mocha-jsdom')
//
// chai.use(chaiHttp)
//
// describe('Unit test', function() {
//   jsdom()
//
//   it('should display a title', (done) => {
//     chai.request(server)
//     .get('/')
//     .end(function(err, res) {
//       res.text.should.include('Grunge Bin')
//       done()
//     })
//   })
//
//   it('should display a list', (done) => {
//     chai.request(server)
//     .get('/api/offenders')
//     .end(function(err, res) {
//       res.text.should.include('offenders')
//       res.text.should.include('offender')
//       done()
//     })
//   })
// })

var expect = require('chai').expect;

var countOffenders = require('../public/count.js').countOffenders

describe('countOffenders', function(){
  var offenders = [
    {
      id: '912ec803b2ce49e4a541068d495ab570',
      offender: {
        date: 1488226849428,
        forgiven: false,
        name: "Steve",
        offense: 'this assessment',
      }
    },
    {
      id: '912ec803b2ce49e4a541068d495ab571',
      offender: {
        date: 1488226849429,
        forgiven: false,
        name: "Meeka",
        offense: 'being pretty',
      }
    },
  ]

  it('measures total, unforgiven and forgiven', function(){
    var subject = countOffenders(offenders);
    expect(subject.totalOffenders).to.equal(2);
    expect(subject.totalUnforgiven).to.equal(2);
    expect(subject.totalForgiven).to.equal(0);
    offenders[1].offender.forgiven = true;
    var subject = countOffenders(offenders);
    expect(subject.totalOffenders).to.equal(2);
    expect(subject.totalUnforgiven).to.equal(1);
    expect(subject.totalForgiven).to.equal(1);
  })

  it('handles no offenders', function(){
    var subject = countOffenders([]);
    expect(subject.totalOffenders).to.equal(0);
    expect(subject.totalUnforgiven).to.equal(0);
    expect(subject.totalForgiven).to.equal(0);
  })
})
