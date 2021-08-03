const { getFile } = require('../Server/alumnidata.js')
const fs = require('fs')
const assert = require('assert')
require('dotenv').config()

describe('importing alumni data', () => {
  it('gets correct path to data (csv file)', () => {
    assert.strictEqual(getFile(), process.env.ALUMNI_DATA_FILE)
  })

  it('check if file exists', () => {
    try {
      if (fs.existsSync(getFile())) assert(true)
    } catch (err) {
      console.error(err)
      assert(false)
    }
  })
})
