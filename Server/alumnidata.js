require('dotenv').config()
const csv = require('csvtojson')

const getFile = () => process.env.PRIVATE_DIR + '/alumni-locations.csv'

csv()
  .fromFile(getFile())
  .then((jsonData) => {
    console.log(jsonData)
  })

module.exports = { getFile }
