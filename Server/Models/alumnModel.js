const mongoose = require('mongoose')

const AlumnSchema = new mongoose.Schema({
  Session: String,
  Age: Number,
  latlong: [Number, Number],
  Address: {
    streetaddress: String,
    streetaddressline2: String,
    City: String,
    State: String,
    Zipcode: String,
    country: String,
  },
})

const Alumn = mongoose.model('Alumn', AlumnSchema)
module.exports = Alumn
