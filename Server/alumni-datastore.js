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

const getAllAlumni = async () => {
  let cursor = await Alumn.find({})
  return cursor
}

const getAllAlumniLatlong = async () => {
  let cursor = await Alumn.find({})
  return cursor
}

module.exports = { getAllAlumniLatlong }
