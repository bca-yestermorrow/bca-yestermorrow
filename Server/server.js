require('dotenv').config()
const path = require('path')
const express = require('express')

const app = express()

let port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const toplevelDir = path.resolve('.')
// console.log('toplevel', toplevelDir)

app.get('/', (req, res) => {
  res.sendFile(toplevelDir + '/client/public/index.html')
})

app.get('/lat', (req, res) => {
  res.sendFile(toplevelDir + '/client/public/lat.json')
})

app.get('/lng', (req, res) => {
  res.sendFile(toplevelDir + '/client/public/lng.json')
})

app.listen(port, () => {
  console.log('listening on port' + port)
})
