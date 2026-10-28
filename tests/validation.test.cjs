const { test } = require('node:test')
const assert = require('node:assert/strict')
const shared = require('../dist/index.js')
test('packaged schemas reject invalid primitive inputs', () => {
    assert.equal(shared.email.safeParse('not-an-email').success, false)
    assert.equal(shared.jmbag.safeParse('abc').success, false)
    assert.equal(shared.password.safeParse('short').success, false)
    assert.equal(shared.rating.safeParse(6).success, false)
})
test('packaged schemas preserve normalized Croatian phone numbers', () => {
    assert.equal(shared.phoneNumber.parse('+385 91 234 5678'), '+385912345678')
})
test('packaged public enum families match consumer expectations', () => {
    assert.equal(shared.ApplicationStatus.CANCELED, 4)
    assert.equal(shared.JobType.FAST, 2)
    assert.equal(shared.userTypeSchema.safeParse('admin').success, false)
    assert.equal(shared.codebookTypeSchema.parse('job-category'), 'job-category')
})
