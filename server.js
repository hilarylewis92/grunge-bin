const express = require('express')
const app = express()
const path = require('path')
const md5 = require('md5')


const port = process.env.PORT || 3000

app.locals.title = 'Grunge Bin'
app.locals.offenders = [
  {
    name: 'Donald Trump',
    offense: 'He took my happiness forever',
    forgiven: false,
    date: Date.now()
  }
]

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'public/index.html'))
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


app.listen(port, () => {
  console.log(`${app.locals.title} is listening on port ${port}.`)
})
