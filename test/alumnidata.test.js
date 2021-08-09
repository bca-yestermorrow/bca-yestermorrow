const {
  getFile,
  hasNoStreetAddressLine2,
  getJSONFromFile,
  processCityStateZip,
  reconstructAlumnObject,
  processAlumniData,
  start,
} = require('../Server/alumnidata.js')

const fs = require('fs')
const path = require('path')
const assert = require('assert')
require('dotenv').config()

describe('processing and importing alumni data to db', () => {
  // these tests are run from top level, so that's where path resolves
  const privateDir = path.resolve('Server/private')
  const fullFilePath = path.join(privateDir, process.env.ALUMNI_DATA_FILENAME)

  // test data - use to double & triple check that data is clean
  const getTestFile = () => `${process.env.PRIVATE_DIR}/testrawdata.json`
  const subset = JSON.parse(fs.readFileSync(getTestFile()), 'utf8')

  it('gets correct path to data (csv file)', () => {
    assert.strictEqual(getFile(), fullFilePath)
  })

  it('check if file exists', () => {
    assert.strictEqual(fs.existsSync(getFile()), true, 'file should exist')
  })

  it('correctly tells apart 3 and 4 line addresses', () => {
    // TODO bundle the tests into an object for ease of adding more tests
    // let address = [
    //   {
    //     address:
    //     expected:
    //     message:
    //   },
    // ]
    let address1 = '5325 Western Plains Ave\nAbilene, TX 79606\nUnited States'
    assert.strictEqual(hasNoStreetAddressLine2(address1), true)

    let address2 = '30 Juniper Street\nBoston, MA 02119\nUnited States'
    assert.strictEqual(
      hasNoStreetAddressLine2(address2),
      true,
      'basic case - no second line'
    )

    let address3 = '45 orchardhill rd\n\nBoston, MA 02130\nUnited States'
    assert.strictEqual(
      hasNoStreetAddressLine2(address3),
      false,
      'empty string second line counts as second line'
    )

    let address4 = '4 Bucknam Street\nApt 2\nBoston, MA 02120\nUnited States'
    assert.strictEqual(
      hasNoStreetAddressLine2(address4),
      false,
      'this has an apt'
    )

    let address5 = '474 Winhall hollow rd\nBondville, VT 81601\nUnited States'
    assert.strictEqual(
      hasNoStreetAddressLine2(address5),
      true,
      'basic case, compound first line'
    )
  })

  it('break up city,tx,zip into constituent parts', () => {
    let test = 'Abilene, TX 79606'
    assert.strictEqual(processCityStateZip(test)[0], 'Abilene')
    assert.strictEqual(processCityStateZip(test)[1], 'TX')
    assert.strictEqual(processCityStateZip(test)[2], '79606')
  })

  it('check de- and reconstructing of alumn objects', () => {
    let rawObj = {
      Session: 'Designing and Building a Successful Design/Build Business',
      Age: '',
      Address: '2342 Eastern Plains Ave\nAbilene, TX 79606\nUnited States',
      Latitude: '32.36027',
      Longitude: '-99.79693',
      City: 'Abilene',
      State: 'TX',
    }

    let expected = {
      Session: 'Designing and Building a Successful Design/Build Business',
      Age: '',
      latlong: ['32.36027', '-99.79693'],
      Address: {
        streetaddress: '2342 Eastern Plains Ave',
        streetaddressline2: '',
        City: 'Abilene',
        State: 'TX',
        Zipcode: '79606',
        country: 'United States',
      },
    }

    // debugging logging
    // console.debug('expected', expected)
    // console.debug('reconstructed Obj', reconstructAlumnObject(rawObj))

    // use deepStrictEqual to compare values of these objects
    // https://stackoverflow.com/questions/61638863/input-objects-identical-but-not-reference-equal-when-comparing-values-with-str
    assert.deepStrictEqual(reconstructAlumnObject(rawObj), expected)
  })
})
