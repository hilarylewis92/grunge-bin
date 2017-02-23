const express = require('express')
const app = express()
const path = require('path')


const port = process.env.PORT || 3000

app.locals.title = 'Final Assessment'


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'public/index.html'))
})

app.listen(port, () => {
  console.log(`${app.locals.title} is listening on port ${port}.`)
})
