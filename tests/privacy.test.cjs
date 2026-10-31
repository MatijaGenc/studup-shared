const { test } = require('node:test')
const assert = require('node:assert/strict')
const { gdprConsent } = require('../dist/validation.js')
test('legacy registration field is optional and does not compel consent', () => {
    for (const value of [undefined, false, true]) assert.equal(gdprConsent.parse(value), value)
    assert.equal(gdprConsent.safeParse('true').success, false)
})
