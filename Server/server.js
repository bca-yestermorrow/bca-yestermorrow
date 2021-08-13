require('dotenv').config()
const path = require('path')
const alumniStore = require('./alumni-datastore')
const express = require('express')

const app = express()

let port = process.env.PORT || 5000
const toplevelDir = path.resolve('.')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(toplevelDir + '/client/build'))


// console.log('toplevel', toplevelDir)

// return all Alumni data - for local debugging only
// app.get('/alumni', async (req, res) => {
//   let data = await alumniStore.getAllAlumni()
//   res.json(data)
// })

app.get('/alumni-latlong', async (req, res) => {
  let data = await alumniStore.getAllAlumniLatlong()
  res.json(data)
})

// app.get('/', (req, res) => {
//   res.sendFile(toplevelDir + '/client/public/index.html')
// })

app.get("*", (req, res) => {
  res.sendFile(toplevelDir + "/client/build/index.html")
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})
