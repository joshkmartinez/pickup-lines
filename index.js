var express = require('express')
var app = express()
var lines = require('./lines')

const api = express.Router()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
api.get(['/line', '/l', '/r', '/random'], (req, res) => {
  var line = lines[Math.floor(Math.random() * lines.length)]
  console.log(line)
  res.send(line.line)
})
api.get(['/all', '/list', '/a', '/allLines'], (req, res) => {
  res.json(lines)
})
api.get(['/num', 'number', '/n'], (req, res) => {
  res.json(Object.keys(lines).length)
})
api.get('/', (req, res) => {
  res.send(`
This microservice just gives you some pickup lines that will definitely work
- /r
    - returns a random pickup line
- /n
    - returns the number of pickup lines in the db
- /a
    - returns **all** of the pickup lines in the db

https://github.com/joshkmartinez/pickup-lines
  `)
})
app.use('/', api)
app.listen(3000, () => {
  //console.log('Server running on port 3000')
})
