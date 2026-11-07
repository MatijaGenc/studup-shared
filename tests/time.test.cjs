const { test } = require('node:test')
const assert = require('node:assert/strict')
const shared = require('../dist/index.js')

test('jobDateOnly treats a calendar date as UTC midnight', () => {
    assert.equal(shared.jobDateOnly('2026-11-07').toISOString(), '2026-11-07T00:00:00.000Z')
    assert.equal(shared.jobDateOnly('2026-03-29').toISOString(), '2026-03-29T00:00:00.000Z')
    assert.equal(shared.jobDateOnly(new Date('2026-11-06T23:30:00.000Z')).toISOString(), '2026-11-07T00:00:00.000Z')
    assert.equal(shared.jobDateOnly('2026-11-06T23:30:00.000Z').toISOString(), '2026-11-07T00:00:00.000Z')
    assert.equal(shared.jobDateOnly(new Date('2026-11-07T22:30:00.000Z')).toISOString(), '2026-11-07T00:00:00.000Z')
})

test('jobDateOnly rejects impossible calendar dates', () => {
    assert.throws(() => shared.jobDateOnly('2026-02-30'), /Datum nije ispravan/)
    assert.throws(() => shared.jobDateOnly('07.11.2026'), /Datum nije ispravnog formata/)
})

test('zonedJobDateTime converts winter and summer Zagreb wall time to UTC', () => {
    assert.equal(shared.zonedJobDateTime('2026-11-07', '08:00').toISOString(), '2026-11-07T07:00:00.000Z')
    assert.equal(shared.zonedJobDateTime('2026-07-07', '08:00').toISOString(), '2026-07-07T06:00:00.000Z')
    assert.equal(shared.zonedJobDateTime('2026-11-07', '00:00').toISOString(), '2026-11-06T23:00:00.000Z')
    assert.equal(shared.zonedJobDateTime('2026-11-07', '23:59').toISOString(), '2026-11-07T22:59:00.000Z')
})

test('zonedJobDateTime rejects the spring-forward gap', () => {
    assert.throws(() => shared.zonedJobDateTime('2026-03-29', '02:30'), /ne postoji/)
})

test('zonedJobDateTime resolves the autumn overlap to the earlier instant', () => {
    assert.equal(shared.zonedJobDateTime('2026-10-25', '02:30').toISOString(), '2026-10-25T00:30:00.000Z')
})

test('formatters always use the Zagreb business timezone', () => {
    assert.equal(shared.formatJobTime('2026-11-07T07:00:00.000Z'), '08:00')
    assert.equal(shared.formatJobTime('2026-07-07T06:00:00.000Z'), '08:00')
    assert.equal(shared.jobHour('2026-11-07T07:00:00.000Z'), 8)
    assert.equal(shared.formatJobDate('2026-11-07T00:00:00.000Z'), '07.11.2026.')
    assert.equal(shared.formatJobDate('2026-11-06T23:00:00.000Z'), '07.11.2026.')
})

test('formatters reject invalid values', () => {
    assert.throws(() => shared.formatJobTime('not-a-date'), /Datum nije ispravan/)
    assert.throws(() => shared.jobHour('not-a-date'), /Datum nije ispravan/)
    assert.throws(() => shared.formatJobDate('not-a-date'), /Datum nije ispravan/)
})

test('job wages are finite, bounded and limited to two decimals', () => {
    for (const value of [1, 8.5, 8.55, 1000]) {
        assert.equal(shared.jobHourlyRate.safeParse(value).success, true, String(value))
    }
    for (const value of [0, -1, 1000.01, 8.555, Number.POSITIVE_INFINITY, Number.NaN]) {
        assert.equal(shared.jobHourlyRate.safeParse(value).success, false, String(value))
    }
})
