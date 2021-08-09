require('dotenv').config()

// file process
const csv = require('csvtojson')
const fs = require('fs')

// db setup
const mongoose = require('mongoose')
const Alumn = require('./Models/alumnModel.js')

// grab db connection
mongoose.connect(
  `mongodb+srv://YestermorrowAdmin:${process.env.PASS}@cluster0.u2itl.mongodb.net/yestermorrow?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
// show operations Mongoose sends to MongoDB
mongoose.set('debug', true)

// grab file with alumni data
// use .env to secure location of file
const getFile = () =>
  `${process.env.PRIVATE_DIR}/${process.env.ALUMNI_DATA_FILENAME}`

// console.log(getFile())

// get alumni csv data and return JSON array
const getJSONFromFile = async (file) => {
  let data = await csv().fromFile(file)
  return data
}

const processCityStateZip = (str) => {
  // init variables

  // e.g 'Akwesasne, ON K6H 0G5', 'Albany, CA 94706'
  // let re = /^(.+)[,\\s+] ([A-Z]{2}) (.+)$/gm

  //if (re.exec(str) == null) throw new Error(`${str} returns null from regex`)
  //else [, City, State, Zipcode] = re.exec(str)

  // TODO if we're getting undefined, there is a problem
  if (!str) return ['', '', ''] // ! what's a better solution?
  let [City, StateZipcode] = str.split(',')
  let State = StateZipcode.trim().substring(0, 2)
  let Zipcode = StateZipcode.trim().slice(2).trim()

  return [City, State, Zipcode]
}

// check whether this address has a second streetaddres line (e.g. apt, suite, etc..)
// ! note: returns true even if the second line is empty but exists
//returns true/false
const hasNoStreetAddressLine2 = (streetAddress) =>
  streetAddress.split('\n').length === 3
// || streetAddress.split('\n')[1].trim() === ''

const reconstructAlumnObject = (alumni) => {
  let newObj = {}

  // deconstruct alumni object
  let { Session, Age, Latitude, Longitude, Address } = alumni

  // initialize variables to deconstruct address
  let [streetaddress, streetaddressline2, citystatezip, country] = [
    '',
    '',
    '',
    '',
  ]

  // deconstruct the address
  // some addresses have a second line and others don't
  let splitAddress = Address.split('\n')
  if (hasNoStreetAddressLine2(Address)) {
    ;[streetaddress, citystatezip, country] = splitAddress
  } else {
    // first, extract the exposed main parts
    ;[streetaddress, streetaddressline2, citystatezip, country] = splitAddress
  }

  // next break citystatezip intoo component parts
  // console.log('citystatezip -ln:77', citystatezip)
  let [City, State, Zipcode] = processCityStateZip(citystatezip)

  // reconstruct new object (use Mongoose Model)
  newObj = {
    Session,
    Age,
    latlong: [Latitude, Longitude],
    Address: {
      streetaddress,
      streetaddressline2,
      City,
      State,
      Zipcode,
      country,
    },
  }

  return newObj
}

// clean and save alumni data to db
const processAlumniData = async (data) => {
  data.map(async (alumnRawObj) => {
    // de- and reconstruct alumni model -- clean up
    let newObj = reconstructAlumnObject(alumnRawObj)
    // console.log('rawObj', alumnRawObj)
    // console.log('reconstructed Obj', newObj)

    // save object to db
    // https://masteringjs.io/tutorials/mongoose/save
    const alumn = new Alumn(newObj) // add object to model instance

    // save the model -- how can we add error handling
    await alumn.save((err, doc) => {
      if (err) console.log(`failed saving ${newObj}`, err.message)
      else console.log('Inserted: ', doc)
    })
  })
}

// wire everything together
const start = async () => {
  console.log('Entering start...')
  let alumniData = await getJSONFromFile(getFile())
  await processAlumniData(alumniData)
  console.log('Done.')
}

// run the program
start()

// export all functions for testing
module.exports = {
  getFile,
  hasNoStreetAddressLine2,
  getJSONFromFile,
  processCityStateZip,
  reconstructAlumnObject,
  processAlumniData,
  start,
}
