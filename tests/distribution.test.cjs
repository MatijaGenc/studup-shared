const { test } = require('node:test')
const assert = require('node:assert/strict')
const shared = require('../dist/index.js')
test('packaged entry exports CV constraints used by web and native consumers', () => {
    assert.equal(shared.MAX_CV_SIZE_BYTES, 10 * 1024 * 1024)
    assert.deepEqual(shared.ALLOWED_CV_MIME_TYPES, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
    assert.ok(shared.MAX_PROFILE_IMAGE_SIZE_BYTES > 0)
})
