const expect = require('chai').expect
const jsdom = require('mocha-jsdom')

const countOffenders = require('../public/count.js').countOffenders
const sortByDate = require('../public/sort.js').sortByDate
const sortByName = require('../public/sort.js').sortByName

describe('Sort by', () => {
  const offenders = [
    {
      id: '912ec803b2ce49e4a541068d495ab570',
      offender: {
        date: 1488226849429,
        forgiven: false,
        name: "Steve",
        offense: 'this assessment',
      }
    },
    {
      id: '912ec803b2ce49e4a541068d495ab571',
      offender: {
        date: 1488226849427,
        forgiven: false,
        name: "Meeka",
        offense: 'being pretty',
      }
    },
  ]

  it('returns sorted by Date', () => {
    let subject = sortByDate(offenders)
    expect(subject[0].offender.name).to.equal('Steve')
    expect(subject[1].offender.name).to.equal('Meeka')
  })

  it('returns sorted by Name', () => {
    let subject = sortByName(offenders)
    expect(subject[0].offender.name).to.equal('Meeka')
    expect(subject[1].offender.name).to.equal('Steve')
  })
})

describe('countOffenders', () => {
  const offenders = [
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

  it('measures total, unforgiven and forgiven', () => {
    let subject
    subject = countOffenders(offenders)
    expect(subject.totalOffenders).to.equal(2)
    expect(subject.totalUnforgiven).to.equal(2)
    expect(subject.totalForgiven).to.equal(0)
    offenders[1].offender.forgiven = true
    subject = countOffenders(offenders)
    expect(subject.totalOffenders).to.equal(2)
    expect(subject.totalUnforgiven).to.equal(1)
    expect(subject.totalForgiven).to.equal(1)
  })

  it('handles no offenders', () => {
    let subject = countOffenders([])
    expect(subject.totalOffenders).to.equal(0)
    expect(subject.totalUnforgiven).to.equal(0)
    expect(subject.totalForgiven).to.equal(0)
  })
})

// const chai = require('chai')
// const should = chai.should()
// const expect = chai.expect()
// const chaiHttp = require('chai-http')
// const server = require('../server')
// const jsdom = require('mocha-jsdom')
//
// chai.use(chaiHttp)
//
// describe('Unit test', () =>  {
//   jsdom()
//
//   it('should display a title', (done) => {
//     chai.request(server)
//     .get('/')
//     .end((e => rr, res) {
//       res.text.should.include('Grunge Bin')
//       done()
//     })
//   })
//
//   it('should display a list', (done) => {
//     chai.request(server)
//     .get('/api/offenders')
//     .end((e => rr, res) {
//       res.text.should.include('offenders')
//       res.text.should.include('offender')
//       done()
//     })
//   })
// })
