const { test } = require('node:test')
const assert = require('node:assert/strict')
const shared = require('../dist/index.js')

const collectIssueMessages = (issues) =>
    issues.flatMap((issue) => [issue.message, ...collectIssueMessages(issue.errors ? issue.errors.flat() : [])])

const assertInvalidDate = (value) => {
    const result = shared.stringDate.safeParse(value)
    assert.equal(result.success, false, `expected ${JSON.stringify(value)} to be rejected`)
    assert.ok(
        collectIssueMessages(result.error.issues).includes('Datum nije ispravnog formata.'),
        `expected invalidDate issue for ${JSON.stringify(value)}`,
    )
}

test('packaged stringDate rejects NUL and lone surrogate date text', () => {
    assertInvalidDate('2000-01-01T00:00:00.000Z\u0000')
    assertInvalidDate('\u0000')
    assertInvalidDate('2000-01-01T00:00:00.000Z\uD800')
    assertInvalidDate('2000-01-01T00:00:00.000Z\uDC00')
    assertInvalidDate('\uD800')
    assertInvalidDate('\uDC00')
})
test('packaged stringDate preserves empty, null, ISO offset, Date and invalid-date behavior', () => {
    assert.equal(shared.stringDate.parse(''), null)
    assert.equal(shared.stringDate.parse(null), null)
    const parsed = shared.stringDate.parse('2000-01-01T00:00:00.000Z')
    assert.ok(parsed instanceof Date)
    assert.equal(parsed.toISOString(), '2000-01-01T00:00:00.000Z')
    assert.equal(shared.stringDate.parse('2000-01-01T00:00:00+02:00').toISOString(), '1999-12-31T22:00:00.000Z')
    const date = new Date('2020-02-02T00:00:00.000Z')
    assert.equal(shared.stringDate.parse(date), date)
    assertInvalidDate('not-a-date')
    assert.equal(shared.stringDate.safeParse(new Date('invalid')).success, false)
})
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
    assert.equal(shared.ApplicationStatus.CANCELED, 'CANCELED')
    assert.equal(shared.ApplicationStatusId.CANCELED, 4)
    assert.equal(shared.applicationStatusFromId(3), 'APPROVED')
    assert.equal(shared.applicationStatusToId('REJECTED'), 2)
    assert.equal(shared.JobType.FAST, 2)
    assert.equal(shared.JobStatus.CLOSED, 'CLOSED')
    assert.equal(shared.JobStatusId.CLOSED, 2)
    assert.equal(shared.jobStatusFromId(3), 'DELETED')
    assert.equal(shared.jobStatusToId('ACTIVE'), 1)
    assert.equal(shared.userTypeSchema.safeParse('admin').success, false)
    assert.equal(shared.codebookTypeSchema.parse('job-category'), 'job-category')
})
