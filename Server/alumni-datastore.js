require('dotenv').config()
const mongoose = require('mongoose')
const Alumn = require('./Models/alumnModel.js')

// DB connection
mongoose.connect(
  `mongodb+srv://YestermorrowAdmin:${process.env.PASS}@cluster0.u2itl.mongodb.net/yestermorrow?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
// show operations Mongoose sends to MongoDB
mongoose.set('debug', true)

// for debugging purposes only - returns all alumni data
const getAllAlumni = async () => {
  let cursor = await Alumn.find({})
  return cursor
}

// returns alumni langlong pairs
const getAllAlumniLatlong = async () => {
  let cursor = await Alumn.find(
    {},
    { latlong: 1, 'Address.City': 1, 'Address.State': 1 }
  )
  return cursor
}

module.exports = { getAllAlumniLatlong }
