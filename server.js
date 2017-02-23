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
app.locals.offenders = [
  {
    id: 23498749580243029,
    name: 'Donald Trump',
    offense: 'He took my happiness forever',
    forgiven: false,
    date: Date.now()
  }
]

app.get('/', (req, res) => {
  res.redirect('/api/offenders')
})

app.get('/api/offenders', (req, res) => {
  const offenders = app.locals.offenders

  res.json({ offenders })
})

app.post('/api/offenders', (req, res) => {
  const offense = req.body
  const id = md5(offense)
  const offender = { id, offense }

  app.locals.offenders.push(offender)
})

if(!module.parent){
  server.listen(port, () => {
    console.log(`${app.locals.title} is listening on port ${port}.`)
  })
}

module.exports = server
