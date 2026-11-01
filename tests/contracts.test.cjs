const { test } = require('node:test')
const assert = require('node:assert/strict')
const shared = require('../dist/index.js')

test('contract schemas accept the canonical auth response', () => {
    assert.equal(
        shared.authSessionResponseSchema.safeParse({
            accessToken: 'access',
            expiresAt: '2026-11-01T12:00:00.000Z',
            refreshToken: 'refresh',
            user: { id: 'user', isAdmin: false, isBlocked: false, isVerified: true, type: 'student' },
        }).success,
        true,
    )
})

test('contract schemas reject non-UUID entity ids and numeric application statuses', () => {
    assert.equal(shared.jobApplicationCreateRequestSchema.safeParse({ jobId: '1' }).success, false)
    assert.equal(shared.jobApplicationStatusRequestSchema.safeParse({ id: '1', status: 3 }).success, false)
    assert.equal(
        shared.jobApplicationStatusRequestSchema.safeParse({
            id: '00000000-0000-4000-8000-000000000001',
            status: 'APPROVED',
        }).success,
        true,
    )
})

test('job search schema defaults pagination and rejects unsupported sort fields', () => {
    assert.deepEqual(shared.jobSearchRequestSchema.parse({}), {
        pageNumber: 1,
        pageSize: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    })
    assert.equal(shared.jobSearchRequestSchema.safeParse({ sortBy: 'hourlyRate' }).success, false)
})

test('job status schema accepts only canonical wire values', () => {
    assert.equal(shared.jobStatusSchema.safeParse('CLOSED').success, true)
    assert.equal(shared.jobStatusSchema.safeParse(2).success, false)
})
