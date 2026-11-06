const { test } = require('node:test')
const assert = require('node:assert/strict')
const shared = require('../dist/index.js')

const studentId = '00000000-0000-4000-8000-000000000001'
const signedUrl =
    'https://studup-cv.s3.eu-central-1.amazonaws.com/students/cv.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=abc%2Fdef%3D&X-Amz-Credential=key%2Fscope'

test('document download request accepts a UUID with every canonical document kind', () => {
    for (const documentKind of ['cv', 'cert1', 'cert2']) {
        assert.deepEqual(shared.documentDownloadRequestSchema.parse({ studentId, documentKind }), {
            studentId,
            documentKind,
        })
    }
})

test('document download request rejects invalid ids and document kinds', () => {
    assert.equal(shared.documentDownloadRequestSchema.safeParse({ studentId: '1', documentKind: 'cv' }).success, false)
    assert.equal(shared.documentDownloadRequestSchema.safeParse({ studentId, documentKind: 'cert3' }).success, false)
    assert.equal(shared.documentDownloadRequestSchema.safeParse({ studentId }).success, false)
})

test('safe URL schema accepts external HTTPS certificate URLs without fetching them', () => {
    const externalCertificateUrl = 'https://university.example.edu/certificates/student-1.pdf'
    assert.equal(shared.documentDownloadUrlSchema.parse(externalCertificateUrl), externalCertificateUrl)
})

test('safe URL schema rejects non-HTTPS, relative, and credential-bearing URLs', () => {
    for (const unsafeUrl of [
        'http://studup-cv.s3.eu-central-1.amazonaws.com/cv.pdf',
        'ftp://university.example.edu/certificate.pdf',
        '/documents/cert1',
        'documents/cert1',
        'https://user:secret@university.example.edu/certificate.pdf',
    ]) {
        assert.equal(shared.documentDownloadUrlSchema.safeParse(unsafeUrl).success, false, unsafeUrl)
    }
})

test('document download response accepts managed and external expiry values', () => {
    assert.deepEqual(shared.documentDownloadResponseSchema.parse({ downloadUrl: signedUrl, expiresInSeconds: 60 }), {
        downloadUrl: signedUrl,
        expiresInSeconds: 60,
    })
    assert.deepEqual(
        shared.documentDownloadResponseSchema.parse({
            downloadUrl: 'https://university.example.edu/certificates/student-1.pdf',
            expiresInSeconds: null,
        }),
        {
            downloadUrl: 'https://university.example.edu/certificates/student-1.pdf',
            expiresInSeconds: null,
        },
    )
})

test('document download response applies URL safety to its exported downloadUrl field', () => {
    for (const downloadUrl of [
        'http://studup-cv.s3.eu-central-1.amazonaws.com/cv.pdf',
        '/documents/cert1',
        'https://user:secret@university.example.edu/certificate.pdf',
    ]) {
        assert.equal(
            shared.documentDownloadResponseSchema.safeParse({ downloadUrl, expiresInSeconds: 60 }).success,
            false,
            downloadUrl,
        )
    }
    assert.equal(
        shared.documentDownloadResponseSchema.safeParse({
            downloadUrl: 'https://university.example.edu/certificates/student-1.pdf',
        }).success,
        false,
    )
})

test('document download response rejects non-finite, fractional, and out-of-range expiries', () => {
    for (const expiresInSeconds of [Infinity, -Infinity, Number.NaN, 0, -1, 1.5, 301]) {
        assert.equal(
            shared.documentDownloadResponseSchema.safeParse({ downloadUrl: signedUrl, expiresInSeconds }).success,
            false,
            String(expiresInSeconds),
        )
    }
})

test('document download response preserves the exact S3 signed query without normalization', () => {
    const parsed = shared.documentDownloadResponseSchema.parse({ downloadUrl: signedUrl, expiresInSeconds: 60 })
    assert.equal(parsed.downloadUrl, signedUrl)
    assert.match(parsed.downloadUrl, /X-Amz-Signature=abc%2Fdef%3D/)
})

// Whitespace must never allow a credential-bearing URL through validation.
test('download URL rejects whitespace-prefixed credentials', () => {
    for (const value of [' https://user:secret@example.test/cv.pdf', '\thttps://user@example.test/cv.pdf']) {
        assert.equal(shared.documentDownloadUrlSchema.safeParse(value).success, false)
    }
})
