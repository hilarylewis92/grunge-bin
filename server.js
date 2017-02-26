const express = require('express')
const app = express()
const path = require('path')
const md5 = require('md5')
const bodyParser = require('body-parser')
const http = require('http')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000
const server = http.createServer(app)
app.use('/', express.static(path.join(__dirname, 'public')))

app.locals.title = 'Grunge Bin'
app.locals.offenders = []

app.get('/', (req, res) => {
  res.redirect('/api/offenders')
})

app.get('/api/offenders', (req, res) => {
  const { offenders } = app.locals

  res.json({ offenders })
})

app.get('/api/offenders/:id', (req, res) => {
  const { id } = req.params

  var offender = app.locals.offenders.find(offender => {
    return offender.id === id
  })

  res.json({id, offender})
})

app.patch('/api/offenders/:id', (req, res) => {
  const { id } = req.params
  var offenders = app.locals.offenders

  const updateForgive = offenders.filter(offender => {
    if(offender.id === id)
      offender.offender.forgiven = !offender.offender.forgiven
      return offender
  })

  offenders = updateForgive
  res.status(200).json({offenders})
})

app.post('/api/offenders', (req, res) => {
  const offender = req.body
  const id = md5(req.body.name)
  const offense = { id, offender }

  app.locals.offenders.push(offense)
})

if(!module.parent){
  server.listen(port, () => {
    console.log(`${app.locals.title} is listening on port ${port}.`)
  })
}

module.exports = server
